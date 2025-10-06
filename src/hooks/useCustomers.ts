import { useState, useEffect } from "react";
import { Customer } from "@/types/customer";

export function useCustomers(searchText: string, species: string[]) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (searchText) {
          params.append("searchText", searchText);
        }
        if (species.length > 0) {
          params.append("species", species.join(","));
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

    // Debounce search
    const timer = setTimeout(fetchCustomers, 300);
    return () => clearTimeout(timer);
  }, [searchText, species]);

  return { customers, loading, error };
}
