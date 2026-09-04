import type { Metadata } from "next";

// This file backs the static-export artifact that CloudFront and the local
// static server return for unknown paths (`out/404.html`). It sits outside the
// `[locale]` segment, so it cannot use the locale layout, next-intl messages,
// or the shared stylesheet. Everything it needs is inlined to guarantee the
// document renders identically no matter which path produced the 404.
export const metadata: Metadata = {
  title: "Page not found | xHeal",
  description: "The page you requested could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

const COLORS = {
  background: "#f7f8fc",
  card: "#ffffff",
  border: "#e3e6f0",
  primary: "#141933",
  secondary: "#505573",
  brand: "#4764ff",
};

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/guides", label: "Guides" },
  { href: "/blog", label: "Blog" },
  { href: "/support", label: "Support" },
];

export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          boxSizing: "border-box",
          display: "grid",
          placeItems: "center",
          padding: "24px",
          backgroundColor: COLORS.background,
          color: COLORS.primary,
          fontFamily:
            "Manrope, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <main
          style={{
            width: "100%",
            maxWidth: "560px",
            boxSizing: "border-box",
            padding: "40px 32px",
            borderRadius: "20px",
            backgroundColor: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            textAlign: "left",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: COLORS.secondary,
              fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
              fontWeight: 500,
            }}
          >
            Error 404
          </p>
          <h1
            style={{
              margin: "12px 0 0",
              fontSize: "32px",
              lineHeight: 1.2,
              fontWeight: 600,
            }}
          >
            This page could not be found
          </h1>
          <p
            style={{
              margin: "16px 0 0",
              fontSize: "16px",
              lineHeight: 1.6,
              color: COLORS.secondary,
            }}
          >
            The link may be outdated, or the page may have moved. Try one of the
            destinations below.
          </p>
          <nav
            style={{
              marginTop: "28px",
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            {LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  height: "44px",
                  padding: "0 20px",
                  borderRadius: "10px",
                  border: `1px solid ${COLORS.brand}`,
                  color: COLORS.brand,
                  fontSize: "15px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                {label}
              </a>
            ))}
          </nav>
        </main>
      </body>
    </html>
  );
}
