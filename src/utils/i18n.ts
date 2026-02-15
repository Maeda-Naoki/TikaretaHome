import { en } from '@data/translations/en';
import type { Translations } from '@data/translations/ja';
import { ja } from '@data/translations/ja';

const translations: Record<string, Translations> = { ja, en };

export function useTranslations(locale: string | undefined) {
  const lang = locale ?? 'ja';
  return translations[lang] ?? translations.ja;
}
