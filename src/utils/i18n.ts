import { en } from '@data/translations/en';
import type { Translations } from '@data/translations/ja';
import { ja } from '@data/translations/ja';

const translations: Record<string, Translations> = { ja, en };

export function useTranslations(locale: string | undefined) {
  const lang = locale ?? 'ja';
  return translations[lang] ?? translations.ja;
}

export function format(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? ''));
}

export function savingsMonths(monthly: number, yearly: number): number {
  if (monthly <= 0 || yearly <= 0) return 0;
  return Math.floor((monthly * 12 - yearly) / monthly);
}

// Each plan in the translations exposes its own structured `features` shape
// (different keys per plan), so a generic lookup needs to widen the type.
export function planFeature(features: object, key: string): string {
  return (features as Record<string, string>)[key] ?? '';
}
