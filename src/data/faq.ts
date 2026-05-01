export interface FaqEntry {
  category: string;
  question: string;
  answer: string;
}

export const faqs: FaqEntry[] = [
  {
    category: '基本',
    question: 'Tikaretaとは？',
    answer:
      '愛犬との毎日のおさんぽを記録していくと、愛犬のおさんぽの傾向や個性が見えてきます。その積み重ねから「おさんぽタイプ」を診断するアプリです。お気に入りスポットの保存や、他の飼い主さんとの交流も楽しめます。',
  },
  {
    category: '基本',
    question: 'どうやって始めるの？',
    answer:
      'トップページの「無料で始める」ボタンからアカウント登録（Google / LINE / Passkey）を行い、愛犬のプロフィールを登録するだけです。30秒で始められます。',
  },
  {
    category: '診断',
    question: 'タイプ診断はいつ結果が出る？',
    answer:
      '散歩記録が7回以上、休憩スポット登録が5箇所以上になると、自動で「おさんぽタイプ」を診断します。データが増えるほど精度が向上します。',
  },
  {
    category: '診断',
    question: 'AIを使っている？',
    answer:
      'いいえ。おさんぽの時間・距離・休憩の多さ・天気などをもとにした、シンプルなルールベースの仕組みです。診断結果も「なるほど！」と納得しやすいですよ。',
  },
  {
    category: '料金',
    question: '無料で何ができますか？',
    answer:
      'おさんぽの記録、スポット保存、過去の記録の閲覧、直近3日間のふりかえり、基本のタイプ診断、コミュニティへの参加が、すべて無料で使えます。',
  },
  {
    category: '料金',
    question: '有料にしないと記録が見られなくなる？',
    answer:
      'いいえ、無料プランでも全てのおさんぽ記録はいつでも見返せます。詳細な分析・エクスポートなど、有料tierの機能が使えなくなるだけです。',
  },
  {
    category: '料金',
    question: '解約はいつでもできますか？',
    answer: 'はい、いつでも解約できます。解約後も無料プランとして継続利用できます。',
  },
  {
    category: 'プライバシー',
    question: '位置情報は他の人に見られる？',
    answer:
      '散歩記録の位置情報は基本的に非公開です。コミュニティでシェアする場合も、詳細な位置は表示されません。',
  },
  {
    category: 'プライバシー',
    question: 'スマホのバッテリーは減りやすい？',
    answer:
      'GPS記録間隔は20秒に最適化されており、バッテリー消費を最小化しています。気になる場合は手動入力モードもご利用いただけます。',
  },
];

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
