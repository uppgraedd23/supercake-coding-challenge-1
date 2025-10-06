import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

export function Input({ icon, className = "", ...props }: InputProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary">
          {icon}
        </div>
      )}
      <input
        className={`w-full bg-white border border-border rounded-input px-4 py-2.5 text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
          icon ? "pl-11" : ""
        } ${className}`}
        {...props}
      />
    </div>
  );
}
