import { Customer } from "@/types/customer";

interface CustomerCardProps {
  customer: Customer;
}

export function CustomerCard({ customer }: CustomerCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-card transition-shadow">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-lg flex-shrink-0">
          {customer.name.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text mb-1">{customer.name}</h3>
          <p className="text-sm text-text-secondary mb-0.5">{customer.email}</p>
          {customer.phone && (
            <p className="text-sm text-text-secondary">{customer.phone}</p>
          )}

          {customer.pets.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {customer.pets.map((pet) => (
                <span
                  key={pet.id}
                  className="inline-flex items-center px-2.5 py-1 bg-white border border-border rounded-full text-xs text-text"
                >
                  {pet.name} ({pet.species})
                </span>
              ))}
            </div>
          )}

          {customer.pets.length === 0 && (
            <p className="text-xs text-text-tertiary mt-2">No pets</p>
          )}
        </div>
      </div>
    </div>
  );
}
