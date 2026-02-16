import type { Translations } from '@data/translations/ja';

// FAQ カテゴリの型安全なアクセス
export type FAQCategory = 'basic' | 'diagnosis' | 'pricing' | 'privacy';
export type FAQCategoryData = Translations['faq'][FAQCategory];

// FAQ データに安全にアクセスするヘルパー関数
export function getFAQCategoryData(t: Translations, category: FAQCategory): FAQCategoryData {
  return t.faq[category];
}

// FAQ アイテムデータに安全にアクセスするヘルパー関数
export function getFAQItemData(
  t: Translations,
  category: FAQCategory,
  itemKey: string
): { question: string; answer: string } | undefined {
  const categoryData = t.faq[category];
  const item = (categoryData as Record<string, { question: string; answer: string }>)[itemKey];
  return item;
}
