/** Apple logo mark for App Store calls to action. Inherits `currentColor`. */
export default function AppleLogo({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M16.365 12.79c.03 3.2 2.81 4.27 2.84 4.28-.02.08-.44 1.53-1.46 3.02-.88 1.29-1.8 2.57-3.24 2.6-1.42.03-1.87-.84-3.49-.84-1.62 0-2.13.81-3.47.87-1.39.05-2.45-1.39-3.34-2.68-1.82-2.63-3.2-7.43-1.34-10.67.93-1.61 2.58-2.63 4.37-2.66 1.37-.03 2.65.92 3.49.92.83 0 2.4-1.14 4.05-.97.69.03 2.62.28 3.86 2.1-.1.06-2.3 1.35-2.27 4.03zM13.68 4.46c.73-.89 1.23-2.13 1.09-3.36-1.06.04-2.34.7-3.1 1.59-.68.79-1.28 2.05-1.12 3.26 1.18.09 2.39-.6 3.13-1.49z" />
    </svg>
  );
}
