import { useState, useEffect, useCallback, useRef } from "react";

const ALL_ROLES = [
  "Data Analyst", "Data Scientist", "Data Engineer", "Business Analyst",
  "Full Stack Developer", "Frontend Developer", "Backend Developer", "React Developer",
  "DevOps Engineer", "Cloud Architect", "Site Reliability Engineer", "Platform Engineer",
  "Product Manager", "Product Designer", "UI/UX Designer", "UX Researcher",
  "Machine Learning Engineer", "AI Engineer", "MLOps Engineer", "NLP Engineer",
  "Cybersecurity Analyst", "Penetration Tester", "Security Engineer",
  "Mobile Developer", "Android Developer", "iOS Developer", "Flutter Developer",
  "Blockchain Developer", "Web3 Developer", "Smart Contract Developer",
  "Game Developer", "Unity Developer", "Unreal Engine Developer",
  "Embedded Systems Engineer", "Firmware Engineer", "IoT Developer",
  "QA Engineer", "Test Automation Engineer", "SDET",
  "Scrum Master", "Agile Coach", "Technical Program Manager",
  "Solutions Architect", "Enterprise Architect", "IT Manager",
];

interface UseSearchReturn {
  query:         string;
  setQuery:      (q: string) => void;
  suggestions:   string[];
  isSearching:   boolean;
  clearQuery:    () => void;
  debouncedQuery: string;
}

export function useSearch(debounceMs = 300): UseSearchReturn {
  const [query,          setQuery]          = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [suggestions,    setSuggestions]    = useState<string[]>([]);
  const [isSearching,    setIsSearching]    = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  // Debounce
  useEffect(() => {
    setIsSearching(true);
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
    }, debounceMs);

    return () => clearTimeout(timerRef.current);
  }, [query, debounceMs]);

  // Filter suggestions from debounced query
  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    const q = debouncedQuery.toLowerCase();
    const filtered = ALL_ROLES.filter((r) =>
      r.toLowerCase().includes(q)
    ).slice(0, 7);
    setSuggestions(filtered);
  }, [debouncedQuery]);

  const clearQuery = useCallback(() => {
    setQuery("");
    setDebouncedQuery("");
    setSuggestions([]);
  }, []);

  return { query, setQuery, suggestions, isSearching, clearQuery, debouncedQuery };
}
