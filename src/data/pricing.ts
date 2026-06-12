export type PlanKey = 'free' | 'standard' | 'pro';

export type PlanCtaStyle = 'btn-primary' | 'btn-ghost' | 'btn-soft';

export interface PlanFeatureKey {
  key: string;
  emphasized?: boolean;
}

export interface Plan {
  key: PlanKey;
  monthly: number;
  yearly: number;
  featureKeys: PlanFeatureKey[];
  ctaStyle: PlanCtaStyle;
  featured: boolean;
}

export const plans: Plan[] = [
  {
    key: 'free',
    monthly: 0,
    yearly: 0,
    featureKeys: [
      { key: 'walkTracking' },
      { key: 'restSpots' },
      { key: 'weatherTracking' },
      { key: 'allDataAccess' },
      { key: 'basicStats' },
      { key: 'basicType' },
      { key: 'community' },
    ],
    ctaStyle: 'btn-ghost',
    featured: false,
  },
  {
    key: 'standard',
    monthly: 300,
    yearly: 2400,
    featureKeys: [
      { key: 'allFree', emphasized: true },
      { key: 'fullStats' },
      { key: 'detailedType' },
      { key: 'dataExport' },
    ],
    ctaStyle: 'btn-primary',
    featured: true,
  },
  {
    key: 'pro',
    monthly: 500,
    yearly: 4800,
    featureKeys: [
      { key: 'allStandard', emphasized: true },
      { key: 'breedComparison' },
      { key: 'routeSuggestion' },
      { key: 'heatmap' },
      { key: 'trendAnalysis' },
    ],
    ctaStyle: 'btn-soft',
    featured: false,
  },
];

export interface ComparisonFeature {
  nameKey: string;
  free: boolean;
  standard: boolean;
  pro: boolean;
}

export const comparisonFeatures: ComparisonFeature[] = [
  { nameKey: 'walkTracking', free: true, standard: true, pro: true },
  { nameKey: 'restSpots', free: true, standard: true, pro: true },
  { nameKey: 'weatherTracking', free: true, standard: true, pro: true },
  { nameKey: 'allDataAccess', free: true, standard: true, pro: true },
  { nameKey: 'basicStats', free: true, standard: true, pro: true },
  { nameKey: 'basicType', free: true, standard: true, pro: true },
  { nameKey: 'community', free: true, standard: true, pro: true },
  { nameKey: 'fullStats', free: false, standard: true, pro: true },
  { nameKey: 'detailedType', free: false, standard: true, pro: true },
  { nameKey: 'dataExport', free: false, standard: true, pro: true },
  { nameKey: 'breedComparison', free: false, standard: false, pro: true },
  { nameKey: 'routeSuggestion', free: false, standard: false, pro: true },
  { nameKey: 'heatmap', free: false, standard: false, pro: true },
  { nameKey: 'trendAnalysis', free: false, standard: false, pro: true },
];
