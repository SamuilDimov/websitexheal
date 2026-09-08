"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Icon from "@/components/ui/Icon";

/**
 * Early access — the professional page's closing, in place of the consumer
 * App Store download (`Footer` swaps them by route).
 *
 * Where the request goes: if `NEXT_PUBLIC_EARLY_ACCESS_ENDPOINT` is set the
 * form posts JSON to it, which is how it should run once the preorder Lambda
 * in `infra/aws/lambda/preorder` is pointed at this page. With no endpoint
 * configured — the case today, on a static export with no backend — it opens
 * the visitor's mail client with the details filled in rather than showing a
 * success message for a request nobody received.
 */

const CONTACT_EMAIL = "support@xheal.ai";
/**
 * The hero's laptop is a modified CC-BY model, and CC-BY requires credit
 * wherever the work appears. This is that credit: the page it appears on, in
 * the fine print rather than the hero, which is where a colophon belongs.
 * If the model is ever swapped out, this goes with it.
 */
const MODEL_SOURCE =
  "https://sketchfab.com/3d-models/macbook-pro-m3-16-inch-2024-8e34fc2b303144f78490007d91ff57c4";
const MODEL_LICENCE = "https://creativecommons.org/licenses/by/4.0/";
const ENDPOINT = process.env.NEXT_PUBLIC_EARLY_ACCESS_ENDPOINT;

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

export default function ProClosing() {
  const t = useTranslations("Pro");
  const [email, setEmail] = useState("");
  const [practice, setPractice] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;

    if (!ENDPOINT) {
      const subject = encodeURIComponent(
        `Early access — ${practice || "xHeal Provider Workspace"}`,
      );
      const body = encodeURIComponent(
        `Practice: ${practice}\nWork email: ${email}\n`,
      );
      setStatus("mailto");
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, practice, source: "professionals" }),
      });
      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="early-access"
      aria-labelledby="pro-closing-heading"
      className="scroll-mt-[88px] bg-xbg-2"
    >
      <div className="x-container x-section grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-6">
          <h2
            id="pro-closing-heading"
            className="t-display2 text-xprimary max-w-[16ch]"
          >
            {t("closingHeading")}
          </h2>
          <p className="t-lead text-xsecondary mt-5 max-w-[44ch]">
            {t("closingBody")}
          </p>
          <p className="t-body2 text-xtertiary mt-8">
            {t("closingEmailHint")}{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-xlink underline underline-offset-4">
              {t("closingEmail")}
            </a>
          </p>

          <p className="t-caption text-xtertiary mt-6">
            {t.rich("credit", {
              author: (chunks) => (
                <a
                  href={MODEL_SOURCE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  {chunks}
                </a>
              ),
              license: (chunks) => (
                <a
                  href={MODEL_LICENCE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>

        <div className="md:col-span-6 md:pl-6">
          {status === "sent" ? (
            <p className="t-h4 text-xprimary max-w-[30ch]">{t("formSuccess")}</p>
          ) : (
            <form className="flex flex-col gap-3" onSubmit={onSubmit}>
              <label className="sr-only" htmlFor="early-practice">
                {t("formPractice")}
              </label>
              <input
                id="early-practice"
                name="practice"
                type="text"
                value={practice}
                onChange={(event) => setPractice(event.target.value)}
                placeholder={t("formPractice")}
                autoComplete="organization"
                className="pro-field"
              />

              <label className="sr-only" htmlFor="early-email">
                {t("formEmail")}
              </label>
              <input
                id="early-email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t("formEmail")}
                autoComplete="email"
                className="pro-field"
              />

              <button
                type="submit"
                className="x-btn x-btn--primary mt-1 justify-center"
                disabled={status === "sending"}
              >
                {status === "sending" ? t("formSending") : t("formSubmit")}
                <Icon name="arrow_forward" size={16} />
              </button>

              {status === "mailto" ? (
                <p className="t-caption text-xsecondary" role="status">
                  {t("formMailtoNote")}
                </p>
              ) : null}
              {status === "error" ? (
                <p className="t-caption text-xwarning" role="alert">
                  {t("formError")}
                </p>
              ) : null}

              <p className="t-caption text-xtertiary mt-2">
                {t.rich("formConsent", {
                  terms: (chunks) => (
                    <Link href="/terms-conditions" className="text-xlink underline underline-offset-4">
                      {chunks}
                    </Link>
                  ),
                  privacy: (chunks) => (
                    <Link href="/privacy-policy" className="text-xlink underline underline-offset-4">
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
