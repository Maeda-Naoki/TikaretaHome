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
