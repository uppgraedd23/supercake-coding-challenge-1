"use client";

import { useState } from "react";
import { SearchBar } from "@/components/features/SearchBar";
import { PetsPopover } from "@/components/features/PetsPopover";
import { CustomerCard } from "@/components/features/CustomerCard";
import { ViewToggle } from "@/components/ui/ViewToggle";
import { useCustomers } from "@/hooks/useCustomers";

type Species = "dog" | "cat" | "bird" | "hamster" | "rat";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState<Species[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");

  const { customers, loading, error } = useCustomers(searchText, selectedSpecies);

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Search Card */}
        <div className="bg-card p-6 mb-6">
          <h1 className="text-2xl font-bold text-text mb-6">
            Customers and Pets
          </h1>

          <div className="flex gap-4 items-center">
            <SearchBar value={searchText} onChange={setSearchText} />
            <PetsPopover
              selectedSpecies={selectedSpecies}
              onSpeciesChange={setSelectedSpecies}
            />
          </div>
        </div>

        {/* Results Section */}
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
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-text-secondary">
                {customers.length} {customers.length === 1 ? "customer" : "customers"} found
              </p>
              <ViewToggle view={view} onViewChange={setView} />
            </div>
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                  : "flex flex-col gap-4"
              }
            >
              {customers.map((customer) => (
                <CustomerCard key={customer.id} customer={customer} view={view} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
