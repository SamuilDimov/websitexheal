import { NextIntlClientProvider } from "next-intl";

export default async function ClientMessagesProvider({
  children,
  locale,
  namespaces,
}: {
  children: React.ReactNode;
  locale: string;
  namespaces: readonly string[];
}) {
  const messages = (await import(`../messages/${locale}.json`)).default;
  const clientMessages = Object.fromEntries(
    namespaces.map((namespace) => [
      namespace,
      messages[namespace as keyof typeof messages],
    ])
  );

  return (
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      {children}
    </NextIntlClientProvider>
  );
}
