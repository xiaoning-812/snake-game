const CONTROL_BUTTONS = [
  { dir: "up", label: "↑", className: "up" },
  { dir: "left", label: "←", className: "left" },
  { dir: "down", label: "↓", className: "down" },
  { dir: "right", label: "→", className: "right" },
];

export default function TouchControls({ onDirection }) {
  return (
    <div className="controls" aria-label="方向控制">
      {CONTROL_BUTTONS.map(({ dir, label, className }) => (
        <button
          key={dir}
          className={className}
          aria-label={dir}
          onClick={() => onDirection(dir)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
