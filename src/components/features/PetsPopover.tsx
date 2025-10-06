"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "../ui/Button";
import { ChevronDownIcon } from "../ui/icons";

type Species = "dog" | "cat" | "bird" | "hamster" | "rat";

interface PetsPopoverProps {
  selectedSpecies: Species[];
  onSpeciesChange: (species: Species[]) => void;
}

const SPECIES_OPTIONS: { value: Species; label: string }[] = [
  { value: "dog", label: "Dogs" },
  { value: "cat", label: "Cats" },
  { value: "bird", label: "Birds" },
  { value: "hamster", label: "Hamsters" },
  { value: "rat", label: "Rats" },
];

const ANIMATION_DURATION = 300;

export function PetsPopover({
  selectedSpecies,
  onSpeciesChange,
}: PetsPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const closePopover = useCallback(() => {
    if (!isClosing) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, ANIMATION_DURATION);
    }
  }, [isClosing]);

  const togglePopover = () => {
    if (isOpen) {
      closePopover();
    } else {
      setIsOpen(true);
    }
  };

  const toggleSpecies = (species: Species) => {
    const isSelected = selectedSpecies.includes(species);
    onSpeciesChange(
      isSelected
        ? selectedSpecies.filter((s) => s !== species)
        : [...selectedSpecies, species],
    );
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutside =
        !popoverRef.current?.contains(target) &&
        !buttonRef.current?.contains(target);

      if (isOutside) closePopover();
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopover();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closePopover]);

  const isAnyAnimalSelected = selectedSpecies.length === 0;

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={togglePopover}
        className={`inline-flex items-center justify-between gap-2 w-[122px] h-10 px-4 border rounded-popover text-sm text-text transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
          isOpen
            ? "bg-background-active border-border"
            : "bg-white border-border hover:bg-background-secondary"
        }`}
      >
        Pets
        <ChevronDownIcon
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {(isOpen || isClosing) && (
        <div
          ref={popoverRef}
          className="absolute top-full right-0 mt-2 w-[344px] bg-white border border-border rounded-popover shadow-popover p-4 z-50"
          style={{
            animation: isClosing
              ? `popoverOut ${ANIMATION_DURATION}ms ease-in forwards`
              : `popoverIn ${ANIMATION_DURATION}ms ease-out`,
          }}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              variant="pill"
              onClick={() => onSpeciesChange([])}
              className={isAnyAnimalSelected ? "!bg-primary !text-white" : ""}
            >
              Any Animal
            </Button>
            {SPECIES_OPTIONS.map((option) => {
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

          <div className="flex justify-between items-center pt-4 border-t border-border">
            <button
              onClick={() => onSpeciesChange([])}
              className="text-sm text-text-secondary hover:text-text transition-colors"
            >
              Reset
            </button>
            <Button onClick={closePopover}>Apply Filters</Button>
          </div>
        </div>
      )}
    </div>
  );
}
