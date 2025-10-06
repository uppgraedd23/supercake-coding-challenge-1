"use client";

import { useState } from "react";
import { SearchBar } from "@/components/features/SearchBar";
import { PetsPopover } from "@/components/features/PetsPopover";
import { CustomerCard } from "@/components/features/CustomerCard";
import { useCustomers } from "@/hooks/useCustomers";

type Species = "dog" | "cat" | "bird" | "hamster" | "rat";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState<Species[]>([]);

  const { customers, loading, error } = useCustomers(searchText, selectedSpecies);

  return (
    <div className="min-h-screen bg-background-secondary py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-text mb-6">
          Customers and Pets
        </h1>

        <div className="flex gap-4 items-start mb-6">
          <div className="flex-1">
            <SearchBar value={searchText} onChange={setSearchText} />
          </div>
          <PetsPopover
            selectedSpecies={selectedSpecies}
            onSpeciesChange={setSelectedSpecies}
          />
        </div>

        {/* Results */}
        <div className="mt-8">
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-text-secondary">Loading customers...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {!loading && !error && customers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-secondary">No customers found</p>
            </div>
          )}

          {!loading && !error && customers.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customers.map((customer) => (
                <CustomerCard key={customer.id} customer={customer} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
