import { Customer } from "@/types/customer";
import { getPetIcon } from "../ui/icons";

interface CustomerCardProps {
  customer: Customer;
  view: "grid" | "list";
}

export function CustomerCard({ customer, view }: CustomerCardProps) {
  if (view === "list") {
    return (
      <div className="bg-card p-4">
        <div className="flex flex-col sm:flex-row sm:flex-wrap lg:grid lg:grid-cols-[200px_minmax(200px,1fr)_150px_1fr] gap-3 sm:gap-4 lg:gap-6 items-start sm:items-center">
          <div className="font-semibold text-text w-full sm:w-auto lg:truncate">{customer.name}</div>
          <div className="text-sm text-text-secondary w-full sm:flex-1 lg:truncate break-words sm:break-normal">{customer.email}</div>
          <div className="text-sm text-text-secondary w-full sm:w-auto">{customer.phone || '-'}</div>
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {customer.pets.length > 0 ? (
              customer.pets.map((pet) => (
                <span
                  key={pet.id}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-border rounded-full text-xs whitespace-nowrap"
                  style={{ color: pet.color }}
                >
                  {getPetIcon(pet.species, pet.color)}
                  {pet.name} ({pet.species})
                </span>
              ))
            ) : (
              <span className="text-xs text-text-tertiary">No pets</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card p-4">
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold text-text">{customer.name}</h3>
        <p className="text-sm text-text-secondary">{customer.email}</p>
        {customer.phone && (
          <p className="text-sm text-text-secondary">{customer.phone}</p>
        )}
        {customer.pets.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {customer.pets.map((pet) => (
              <span
                key={pet.id}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-border rounded-full text-xs whitespace-nowrap"
                style={{ color: pet.color }}
              >
                {getPetIcon(pet.species, pet.color)}
                {pet.name} ({pet.species})
              </span>
            ))}
          </div>
        )}
        {customer.pets.length === 0 && (
          <p className="text-xs text-text-tertiary">No pets</p>
        )}
      </div>
    </div>
  );
}
