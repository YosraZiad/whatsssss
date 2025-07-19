// src/i18n.ts
import { getRequestConfig } from 'next-intl/server';
 
export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
 
export default getRequestConfig(async ({ locale }) => {
  // التأكد من أن locale ليس undefined
  const localeToUse = locale || defaultLocale;
  return {
    locale: localeToUse,
    messages: (await import(`../messages/${localeToUse}.json`)).default
  };
});
