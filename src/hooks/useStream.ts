import { useState, useCallback, useRef } from "react";

interface UseStreamOptions {
  onChunk?:    (chunk: string)  => void;
  onComplete?: (full: string)   => void;
  onError?:    (error: string)  => void;
}

interface UseStreamReturn {
  stream:    (url: string, body: object) => Promise<void>;
  text:      string;
  loading:   boolean;
  error:     string;
  reset:     () => void;
  abort:     () => void;
}

export function useStream(options: UseStreamOptions = {}): UseStreamReturn {
  const [text,    setText]    = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const controllerRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    setText("");
    setError("");
    setLoading(false);
  }, []);

  const abort = useCallback(() => {
    controllerRef.current?.abort();
    setLoading(false);
  }, []);

  const stream = useCallback(
    async (url: string, body: object) => {
      // Abort any previous stream
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      reset();
      setLoading(true);

      try {
        const res = await fetch(url, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(body),
          signal:  controller.signal,
        });

        if (!res.ok) {
          const json = await res.json().catch(() => ({}));
          throw new Error(json.error || `HTTP ${res.status}`);
        }

        // ── Handle streaming (text/event-stream) ──────────────────────
        if (res.headers.get("content-type")?.includes("text/event-stream")) {
          const reader  = res.body!.getReader();
          const decoder = new TextDecoder();
          let   full    = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6).trim();
                if (data === "[DONE]") break;
                try {
                  const parsed = JSON.parse(data);
                  const token  = parsed.text ?? parsed.delta ?? parsed.content ?? "";
                  if (token) {
                    full += token;
                    setText(full);
                    options.onChunk?.(token);
                  }
                } catch {
                  // Non-JSON data line, skip
                }
              }
            }
          }

          options.onComplete?.(full);

        } else {
          // ── Fallback: regular JSON response ────────────────────────
          const json = await res.json();
          const result = JSON.stringify(json.data ?? json, null, 2);
          setText(result);
          options.onComplete?.(result);
        }

      } catch (err: unknown) {
        if ((err as Error).name === "AbortError") return;
        const msg = err instanceof Error ? err.message : "Stream failed";
        setError(msg);
        options.onError?.(msg);
      } finally {
        setLoading(false);
      }
    },
    [options, reset]
  );

  return { stream, text, loading, error, reset, abort };
}
