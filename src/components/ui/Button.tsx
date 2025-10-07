import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "pill";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all focus:outline-none hover:ring-2 hover:ring-primary hover:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-primary text-white hover:bg-primary-hover active:bg-primary-active px-6 py-2 rounded-button text-sm",
    secondary:
      "bg-white text-text border border-border hover:bg-background-secondary px-6 py-2 rounded-button text-sm",
    pill: "bg-white text-text border border-border hover:bg-primary hover:text-white hover:border-primary px-4 py-1.5 rounded-pill text-sm",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
