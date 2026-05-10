export interface PlanFeatureRow {
  text: string;
  on: boolean;
  emphasized?: boolean;
}

export type PlanCtaStyle = 'btn-primary' | 'btn-ghost' | 'btn-soft';

export interface Plan {
  key: 'free' | 'standard' | 'pro';
  name: string;
  tagline: string;
  monthly: number;
  yearly: number;
  features: PlanFeatureRow[];
  ctaLabel: string;
  ctaStyle: PlanCtaStyle;
  featured: boolean;
}

export const plans: Plan[] = [
  {
    key: 'free',
    name: 'Freeプラン',
    tagline: 'まずは試したい方に',
    monthly: 0,
    yearly: 0,
    features: [
      { text: 'おさんぽ記録（GPS / 手動）', on: true },
      { text: 'スポット登録（写真3枚まで）', on: true },
      { text: '天気・気温の自動記録', on: true },
      { text: '全期間データ閲覧', on: true },
      { text: '基本統計（直近3日間）', on: true },
      { text: '基本タイプ診断 / コミュニティ', on: true },
      { text: '詳細タイプ分析', on: false },
      { text: '回避ルート / トレンド分析', on: false },
    ],
    ctaLabel: '無料で始める',
    ctaStyle: 'btn-ghost',
    featured: false,
  },
  {
    key: 'standard',
    name: 'Standard',
    tagline: 'もっと深く知りたい方に',
    monthly: 300,
    yearly: 2400,
    features: [
      { text: 'Freeプランの全て', on: true, emphasized: true },
      { text: '全期間統計・ふりかえり', on: true },
      { text: '詳細タイプ分析（複数の切り口）', on: true },
      { text: 'シェアカード生成（無制限）', on: true },
      { text: 'CSV/JSONエクスポート', on: true },
      { text: '回避ルート / 比較 / トレンド', on: false },
    ],
    ctaLabel: 'Standardを始める',
    ctaStyle: 'btn-primary',
    featured: true,
  },
  {
    key: 'pro',
    name: 'Pro',
    tagline: 'プロのおさんぽ研究家へ',
    monthly: 500,
    yearly: 4800,
    features: [
      { text: 'Standardの全機能', on: true, emphasized: true },
      { text: 'パターン分析レポート', on: true },
      { text: '同犬種との比較', on: true },
      { text: 'トレンド分析（先月比・季節別）', on: true },
      { text: '回避ルート提案', on: true },
      { text: 'みんなの休憩ポイント（ヒートマップ）', on: true },
    ],
    ctaLabel: 'Proを始める',
    ctaStyle: 'btn-soft',
    featured: false,
  },
];

export interface ComparisonFeature {
  nameKey: string;
  free: boolean;
  premium: boolean;
}

export const comparisonFeatures: ComparisonFeature[] = [
  { nameKey: 'walkTracking', free: true, premium: true },
  { nameKey: 'restSpots', free: true, premium: true },
  { nameKey: 'weatherTracking', free: true, premium: true },
  { nameKey: 'allDataAccess', free: true, premium: true },
  { nameKey: 'basicStats', free: true, premium: true },
  { nameKey: 'basicType', free: true, premium: true },
  { nameKey: 'community', free: true, premium: true },
  { nameKey: 'fullStats', free: false, premium: true },
  { nameKey: 'detailedType', free: false, premium: true },
  { nameKey: 'breedComparison', free: false, premium: true },
  { nameKey: 'routeSuggestion', free: false, premium: true },
  { nameKey: 'heatmap', free: false, premium: true },
  { nameKey: 'dataExport', free: false, premium: true },
  { nameKey: 'customShare', free: false, premium: true },
];

export interface PricingPlan {
  id: 'free' | 'monthly' | 'yearly';
  nameKey: string;
  price: number;
  currency: string;
  period: 'month' | 'year' | null;
  featuresKey: string[];
  recommended?: boolean;
  savings?: string;
  ctaKey: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    nameKey: 'pricing.plans.free.name',
    price: 0,
    currency: 'JPY',
    period: null,
    featuresKey: [
      'pricing.plans.free.features.walkTracking',
      'pricing.plans.free.features.restSpots',
      'pricing.plans.free.features.weatherTracking',
      'pricing.plans.free.features.allDataAccess',
      'pricing.plans.free.features.basicStats',
      'pricing.plans.free.features.basicType',
      'pricing.plans.free.features.community',
    ],
    ctaKey: 'pricing.plans.free.cta',
  },
  {
    id: 'monthly',
    nameKey: 'pricing.plans.monthly.name',
    price: 300,
    currency: 'JPY',
    period: 'month',
    recommended: true,
    featuresKey: [
      'pricing.plans.monthly.features.allFree',
      'pricing.plans.monthly.features.fullStats',
      'pricing.plans.monthly.features.detailedType',
      'pricing.plans.monthly.features.breedComparison',
      'pricing.plans.monthly.features.routeSuggestion',
      'pricing.plans.monthly.features.heatmap',
      'pricing.plans.monthly.features.dataExport',
      'pricing.plans.monthly.features.customShare',
    ],
    ctaKey: 'pricing.plans.monthly.cta',
  },
  {
    id: 'yearly',
    nameKey: 'pricing.plans.yearly.name',
    price: 2400,
    currency: 'JPY',
    period: 'year',
    savings: '4ヶ月分お得',
    featuresKey: [
      'pricing.plans.yearly.features.allFree',
      'pricing.plans.yearly.features.fullStats',
      'pricing.plans.yearly.features.detailedType',
      'pricing.plans.yearly.features.breedComparison',
      'pricing.plans.yearly.features.routeSuggestion',
      'pricing.plans.yearly.features.heatmap',
      'pricing.plans.yearly.features.dataExport',
      'pricing.plans.yearly.features.customShare',
    ],
    ctaKey: 'pricing.plans.yearly.cta',
  },
];
