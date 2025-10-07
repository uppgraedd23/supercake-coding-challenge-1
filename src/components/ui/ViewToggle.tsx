interface ViewToggleProps {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="inline-flex bg-white border border-border rounded-lg p-1">
      <button
        onClick={() => onViewChange("grid")}
        className={`flex items-center justify-center px-3 py-1.5 text-sm rounded transition-colors ${view === "grid"
            ? "bg-primary text-white"
            : "text-text hover:bg-background-secondary"
          }`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="inline-block"
        >
          <rect
            x="1"
            y="1"
            width="6"
            height="6"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect
            x="9"
            y="1"
            width="6"
            height="6"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect
            x="1"
            y="9"
            width="6"
            height="6"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect
            x="9"
            y="9"
            width="6"
            height="6"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </button>
      <button
        onClick={() => onViewChange("list")}
        className={`flex items-center justify-center px-3 py-1.5 text-sm rounded transition-colors ${view === "list"
            ? "bg-primary text-white"
            : "text-text hover:bg-background-secondary"
          }`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="inline-block"
        >
          <rect
            x="1"
            y="2"
            width="14"
            height="3"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect
            x="1"
            y="7"
            width="14"
            height="3"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect
            x="1"
            y="12"
            width="14"
            height="3"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </button>
    </div>
  );
}
