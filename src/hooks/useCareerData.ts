import useSWR from "swr";
import type { CareerData } from "@/types/career";

async function fetcher(role: string): Promise<CareerData> {
    const res = await fetch("/api/career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
    });

    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.error || "Failed to fetch career data");
    }

    return json.data as CareerData;
}

interface UseCareerDataResult {
    data: CareerData | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | undefined;
    mutate: () => void;
}

export function useCareerData(role: string | null): UseCareerDataResult {
    const { data, error, isLoading, mutate } = useSWR<CareerData>(
        role ? role : null,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            shouldRetryOnError: false,
            dedupingInterval: 60_000, // 1 min — avoid hammering Gemini
        }
    );

    return {
        data,
        isLoading,
        isError: !!error,
        error,
        mutate,
    };
}
