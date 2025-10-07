"use client";

import { Input } from "../ui/Input";
import { SearchIcon } from "../ui/icons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search by ID, name, email or phone",
}: SearchBarProps) {
  return (
    <Input
      icon={<SearchIcon />}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type="text"
      className="!w-full sm:!w-[312px] !h-10"
    />
  );
}
