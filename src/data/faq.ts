export interface FAQItem {
  id: string;
  questionKey: string;
  answerKey: string;
  category: 'basic' | 'diagnosis' | 'pricing' | 'privacy';
}

export const faqItems: FAQItem[] = [
  // 基本的な使い方
  {
    id: 'what-is-osanpo-type',
    questionKey: 'faq.basic.whatIsOsanpoType.question',
    answerKey: 'faq.basic.whatIsOsanpoType.answer',
    category: 'basic',
  },
  {
    id: 'how-to-start',
    questionKey: 'faq.basic.howToStart.question',
    answerKey: 'faq.basic.howToStart.answer',
    category: 'basic',
  },
  {
    id: 'how-many-dogs',
    questionKey: 'faq.basic.howManyDogs.question',
    answerKey: 'faq.basic.howManyDogs.answer',
    category: 'basic',
  },
  {
    id: 'battery-usage',
    questionKey: 'faq.basic.batteryUsage.question',
    answerKey: 'faq.basic.batteryUsage.answer',
    category: 'basic',
  },
  // タイプ診断について
  {
    id: 'when-diagnosis',
    questionKey: 'faq.diagnosis.whenDiagnosis.question',
    answerKey: 'faq.diagnosis.whenDiagnosis.answer',
    category: 'diagnosis',
  },
  {
    id: 'type-change',
    questionKey: 'faq.diagnosis.typeChange.question',
    answerKey: 'faq.diagnosis.typeChange.answer',
    category: 'diagnosis',
  },
  {
    id: 'using-ai',
    questionKey: 'faq.diagnosis.usingAI.question',
    answerKey: 'faq.diagnosis.usingAI.answer',
    category: 'diagnosis',
  },
  // 料金・課金について
  {
    id: 'free-features',
    questionKey: 'faq.pricing.freeFeatures.question',
    answerKey: 'faq.pricing.freeFeatures.answer',
    category: 'pricing',
  },
  {
    id: 'data-after-downgrade',
    questionKey: 'faq.pricing.dataAfterDowngrade.question',
    answerKey: 'faq.pricing.dataAfterDowngrade.answer',
    category: 'pricing',
  },
  {
    id: 'cancel-anytime',
    questionKey: 'faq.pricing.cancelAnytime.question',
    answerKey: 'faq.pricing.cancelAnytime.answer',
    category: 'pricing',
  },
  {
    id: 'payment-methods',
    questionKey: 'faq.pricing.paymentMethods.question',
    answerKey: 'faq.pricing.paymentMethods.answer',
    category: 'pricing',
  },
  // プライバシー・セキュリティ
  {
    id: 'location-privacy',
    questionKey: 'faq.privacy.locationPrivacy.question',
    answerKey: 'faq.privacy.locationPrivacy.answer',
    category: 'privacy',
  },
  {
    id: 'data-handling',
    questionKey: 'faq.privacy.dataHandling.question',
    answerKey: 'faq.privacy.dataHandling.answer',
    category: 'privacy',
  },
];

export const faqByCategory = {
  basic: faqItems.filter((item) => item.category === 'basic'),
  diagnosis: faqItems.filter((item) => item.category === 'diagnosis'),
  pricing: faqItems.filter((item) => item.category === 'pricing'),
  privacy: faqItems.filter((item) => item.category === 'privacy'),
};
