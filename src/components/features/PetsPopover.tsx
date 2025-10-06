"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/Button";
import { ChevronDownIcon } from "../ui/icons";

type Species = "dog" | "cat" | "bird" | "hamster" | "rat";

interface PetsPopoverProps {
  selectedSpecies: Species[];
  onSpeciesChange: (species: Species[]) => void;
}

const speciesOptions: { value: Species; label: string }[] = [
  { value: "dog", label: "Dogs" },
  { value: "cat", label: "Cats" },
  { value: "bird", label: "Birds" },
  { value: "hamster", label: "Hamsters" },
  { value: "rat", label: "Rats" },
];

export function PetsPopover({
  selectedSpecies,
  onSpeciesChange,
}: PetsPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const toggleSpecies = (species: Species) => {
    if (selectedSpecies.includes(species)) {
      onSpeciesChange(selectedSpecies.filter((s) => s !== species));
    } else {
      onSpeciesChange([...selectedSpecies, species]);
    }
  };

  const handleReset = () => {
    onSpeciesChange([]);
  };

  const handleApply = () => {
    setIsOpen(false);
  };

  const isAnyAnimal = selectedSpecies.length === 0;

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-popover text-sm text-text hover:bg-background-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Pets
        <ChevronDownIcon
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute top-full mt-2 w-[344px] bg-white border border-border rounded-popover shadow-popover p-4 z-50 animate-popover-in"
          style={{
            animation: "popoverIn 200ms ease-out",
          }}
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              <Button
                variant="pill"
                onClick={() => onSpeciesChange([])}
                className={isAnyAnimal ? "!bg-primary !text-white" : ""}
              >
                Any Animal
              </Button>
              {speciesOptions.map((option) => {
                const isSelected = selectedSpecies.includes(option.value);
                return (
                  <Button
                    key={option.value}
                    variant="pill"
                    onClick={() => toggleSpecies(option.value)}
                    className={
                      isSelected ? "!bg-primary !text-white !border-primary" : ""
                    }
                  >
                    {option.label}
                  </Button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-border mt-2">
              <button
                onClick={handleReset}
                className="text-sm text-text-secondary hover:text-text transition-colors"
              >
                Reset
              </button>
              <Button onClick={handleApply}>Apply Filters</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
