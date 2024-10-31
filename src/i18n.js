import { getRequestConfig } from "next-intl/server";
import { defineRouting } from "next-intl/routing";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { supportedLocales } from "./languageConfig";

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../messages/${locale}.json`)).default,
  timeZone: "Europe/Vienna",
}));

export const routing = defineRouting({
  locales: supportedLocales,
  defaultLocale: "en",
});

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing);
