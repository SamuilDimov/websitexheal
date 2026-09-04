/**
 * A label that rolls up to a duplicate of itself on hover — the second half
 * of the Bright button treatment (see `MagneticHover`). The clipped box is
 * one line tall and holds the label twice, the copy sitting exactly one line
 * below; hovering the enclosing `[data-magnetic]` slides both up by a line.
 *
 * Pure CSS, so it costs nothing and works on a server-rendered button. The
 * duplicate is `aria-hidden`, so the accessible name stays the label once.
 */
export default function RollText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={`roll-text ${className}`.trim()}>
      <span className="roll-text__line">{children}</span>
      <span className="roll-text__line roll-text__line--dup" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}
