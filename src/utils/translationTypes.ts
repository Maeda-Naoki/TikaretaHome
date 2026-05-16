import type { FAQItem } from '@data/faq';
import type { Translations } from '@data/translations/ja';

export type FAQCategory = 'basic' | 'diagnosis' | 'pricing' | 'privacy';
export type FAQCategoryData = Translations['faq'][FAQCategory];

export function getFAQCategoryData(t: Translations, category: FAQCategory): FAQCategoryData {
  return t.faq[category];
}

export function getFAQItemData(
  t: Translations,
  category: FAQCategory,
  itemKey: string
): { question: string; answer: string } | undefined {
  const categoryData = t.faq[category];
  const item = (categoryData as Record<string, { question: string; answer: string }>)[itemKey];
  return item;
}

export function resolveFAQItem(
  t: Translations,
  item: FAQItem
): { id: string; itemKey: string; category: FAQCategory; question: string; answer: string } {
  const parts = item.questionKey.split('.');
  const itemKey = parts[parts.length - 2];
  const category = item.category as FAQCategory;
  const data = getFAQItemData(t, category, itemKey);
  return {
    id: item.id,
    itemKey,
    category,
    question: data?.question ?? '',
    answer: data?.answer ?? '',
  };
}

export function mapFAQItems(
  t: Translations,
  items: FAQItem[]
): Array<{ question: string; answer: string }> {
  return items.map((item) => {
    const resolved = resolveFAQItem(t, item);
    return { question: resolved.question, answer: resolved.answer };
  });
}
