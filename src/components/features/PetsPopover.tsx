"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "../ui/Button";
import { ChevronDownIcon, getPetIcon } from "../ui/icons";
import { colors } from "@/lib/colors";

import { Species } from "@/types/customer";

interface PetsPopoverProps {
  selectedSpecies: Species[];
  onSpeciesChange: (species: Species[]) => void;
}

const SPECIES_OPTIONS: readonly { value: Species; label: string }[] = [
  { value: "dog", label: "Dogs" },
  { value: "cat", label: "Cats" },
  { value: "bird", label: "Birds" },
  { value: "hamster", label: "Hamsters" },
  { value: "rat", label: "Rats" },
] as const;

const ANIMATION_DURATION = 300;

export function PetsPopover({
  selectedSpecies,
  onSpeciesChange,
}: PetsPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [hoveredSpecies, setHoveredSpecies] = useState<Species | null>(null);
  const [hoveredBadge, setHoveredBadge] = useState<Species | null>(null);
  const [tempSelectedSpecies, setTempSelectedSpecies] = useState<Species[]>(selectedSpecies);
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
      setTempSelectedSpecies(selectedSpecies);
      setIsOpen(true);
    }
  };

  const toggleTempSpecies = (species: Species) => {
    const isSelected = tempSelectedSpecies.includes(species);
    setTempSelectedSpecies(
      isSelected
        ? tempSelectedSpecies.filter((s) => s !== species)
        : [...tempSelectedSpecies, species],
    );
  };

  const applyFilters = () => {
    onSpeciesChange(tempSelectedSpecies);
    closePopover();
  };

  const resetFilters = () => {
    setTempSelectedSpecies([]);
  };

  const removeBadgeSpecies = (species: Species) => {
    const newSpecies = selectedSpecies.filter((s) => s !== species);
    onSpeciesChange(newSpecies);
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

  const isAnyAnimalSelected = tempSelectedSpecies.length === 0;

  return (
    <div className="relative flex items-center gap-2">
      <button
        ref={buttonRef}
        onClick={togglePopover}
        className={`inline-flex items-center justify-between gap-2 w-[122px] h-10 px-4 border rounded-popover text-sm text-text transition-colors focus:outline-none ${isOpen
          ? "bg-background-active border-border"
          : "bg-white border-border hover:bg-background-secondary"
          }`}
      >
        Pets
        <ChevronDownIcon
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {selectedSpecies.length > 0 && (
        <div className="flex gap-1.5">
          {selectedSpecies.map((species) => {
            const option = SPECIES_OPTIONS.find(opt => opt.value === species);
            const isHovered = hoveredBadge === species;
            return (
              <button
                key={species}
                onClick={() => removeBadgeSpecies(species)}
                onMouseEnter={() => setHoveredBadge(species)}
                onMouseLeave={() => setHoveredBadge(null)}
                className="relative inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-border rounded-full text-xs text-text hover:bg-background-secondary transition-colors cursor-pointer"
              >
                <span className="inline-block">
                  {getPetIcon(species, colors.icon.default)}
                </span>
                {option?.label}
                <span
                  className={`absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 2L2 6M2 2L6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
            );
          })}
        </div>
      )}

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
              onClick={() => setTempSelectedSpecies([])}
              className={isAnyAnimalSelected ? "!bg-primary !text-white" : ""}
            >
              Any Animal
            </Button>
            {SPECIES_OPTIONS.map((option) => {
              const isSelected = tempSelectedSpecies.includes(option.value);
              const isHovered = hoveredSpecies === option.value;
              const iconColor = (isSelected || isHovered) ? colors.icon.white : colors.icon.default;
              return (
                <Button
                  key={option.value}
                  variant="pill"
                  onClick={() => toggleTempSpecies(option.value)}
                  onMouseEnter={() => setHoveredSpecies(option.value)}
                  onMouseLeave={() => setHoveredSpecies(null)}
                  className={
                    isSelected ? "!bg-primary !text-white !border-primary" : ""
                  }
                >
                  <span className="inline-block mr-1.5">
                    {getPetIcon(option.value, iconColor)}
                  </span>
                  {option.label}
                </Button>
              );
            })}
          </div>

          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              variant="secondary"
              onClick={resetFilters}
              className="flex-1"
            >
              Reset
            </Button>
            <Button onClick={applyFilters} className="flex-1">Apply Filters</Button>
          </div>
        </div>
      )}
    </div>
  );
}
