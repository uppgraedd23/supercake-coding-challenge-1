import { useState, useEffect, useMemo } from "react";
import { Customer } from "@/types/customer";
import { useDebounce } from "./useDebounce";

export function useCustomers(searchText: string, species: string[]) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchText = useDebounce(searchText, 300);
  const speciesStr = useMemo(() => species.join(","), [species]);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (debouncedSearchText) {
          params.append("searchText", debouncedSearchText);
        }
        if (speciesStr) {
          params.append("species", speciesStr);
        }

        const response = await fetch(`/api/customers?${params.toString()}`);
        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }

        const data = await response.json();
        setCustomers(data.customers);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [debouncedSearchText, speciesStr]);

  return { customers, loading, error };
}
