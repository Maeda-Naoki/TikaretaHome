export interface Feature {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
  tier: 'free' | 'premium';
}

export const features: Feature[] = [
  // 無料機能
  {
    id: 'walk-tracking',
    icon: '📍',
    titleKey: 'features.walkTracking.title',
    descriptionKey: 'features.walkTracking.description',
    tier: 'free',
  },
  {
    id: 'rest-spots',
    icon: '🏞️',
    titleKey: 'features.restSpots.title',
    descriptionKey: 'features.restSpots.description',
    tier: 'free',
  },
  {
    id: 'weather-tracking',
    icon: '🌤️',
    titleKey: 'features.weatherTracking.title',
    descriptionKey: 'features.weatherTracking.description',
    tier: 'free',
  },
  {
    id: 'all-data-access',
    icon: '📊',
    titleKey: 'features.allDataAccess.title',
    descriptionKey: 'features.allDataAccess.description',
    tier: 'free',
  },
  {
    id: 'basic-stats',
    icon: '📈',
    titleKey: 'features.basicStats.title',
    descriptionKey: 'features.basicStats.description',
    tier: 'free',
  },
  {
    id: 'basic-type',
    icon: '🐕',
    titleKey: 'features.basicType.title',
    descriptionKey: 'features.basicType.description',
    tier: 'free',
  },
  {
    id: 'community',
    icon: '💬',
    titleKey: 'features.community.title',
    descriptionKey: 'features.community.description',
    tier: 'free',
  },
  // プレミアム機能
  {
    id: 'full-stats',
    icon: '📊',
    titleKey: 'features.fullStats.title',
    descriptionKey: 'features.fullStats.description',
    tier: 'premium',
  },
  {
    id: 'detailed-type',
    icon: '🎯',
    titleKey: 'features.detailedType.title',
    descriptionKey: 'features.detailedType.description',
    tier: 'premium',
  },
  {
    id: 'breed-comparison',
    icon: '🐶',
    titleKey: 'features.breedComparison.title',
    descriptionKey: 'features.breedComparison.description',
    tier: 'premium',
  },
  {
    id: 'route-suggestion',
    icon: '🗺️',
    titleKey: 'features.routeSuggestion.title',
    descriptionKey: 'features.routeSuggestion.description',
    tier: 'premium',
  },
  {
    id: 'heatmap',
    icon: '🔥',
    titleKey: 'features.heatmap.title',
    descriptionKey: 'features.heatmap.description',
    tier: 'premium',
  },
  {
    id: 'data-export',
    icon: '💾',
    titleKey: 'features.dataExport.title',
    descriptionKey: 'features.dataExport.description',
    tier: 'premium',
  },
  {
    id: 'vet-report',
    icon: '🏥',
    titleKey: 'features.vetReport.title',
    descriptionKey: 'features.vetReport.description',
    tier: 'premium',
  },
  {
    id: 'custom-share',
    icon: '✨',
    titleKey: 'features.customShare.title',
    descriptionKey: 'features.customShare.description',
    tier: 'premium',
  },
];

export const freeFeatures = features.filter((f) => f.tier === 'free');
export const premiumFeatures = features.filter((f) => f.tier === 'premium');
