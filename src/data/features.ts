export interface Feature {
  id: string;
  icon: string;
  iconType: 'lucide' | 'emoji';
  titleKey: string;
  descriptionKey: string;
  tier: 'free' | 'premium';
}

export const features: Feature[] = [
  // 無料機能
  {
    id: 'walk-tracking',
    icon: 'MapPin',
    iconType: 'lucide',
    titleKey: 'features.walkTracking.title',
    descriptionKey: 'features.walkTracking.description',
    tier: 'free',
  },
  {
    id: 'rest-spots',
    icon: 'Image',
    iconType: 'lucide',
    titleKey: 'features.restSpots.title',
    descriptionKey: 'features.restSpots.description',
    tier: 'free',
  },
  {
    id: 'weather-tracking',
    icon: 'CloudSun',
    iconType: 'lucide',
    titleKey: 'features.weatherTracking.title',
    descriptionKey: 'features.weatherTracking.description',
    tier: 'free',
  },
  {
    id: 'all-data-access',
    icon: 'BarChart3',
    iconType: 'lucide',
    titleKey: 'features.allDataAccess.title',
    descriptionKey: 'features.allDataAccess.description',
    tier: 'free',
  },
  {
    id: 'basic-stats',
    icon: 'TrendingUp',
    iconType: 'lucide',
    titleKey: 'features.basicStats.title',
    descriptionKey: 'features.basicStats.description',
    tier: 'free',
  },
  {
    id: 'basic-type',
    icon: 'Dog',
    iconType: 'lucide',
    titleKey: 'features.basicType.title',
    descriptionKey: 'features.basicType.description',
    tier: 'free',
  },
  {
    id: 'community',
    icon: 'MessageCircle',
    iconType: 'lucide',
    titleKey: 'features.community.title',
    descriptionKey: 'features.community.description',
    tier: 'free',
  },
  // プレミアム機能
  {
    id: 'full-stats',
    icon: 'BarChart3',
    iconType: 'lucide',
    titleKey: 'features.fullStats.title',
    descriptionKey: 'features.fullStats.description',
    tier: 'premium',
  },
  {
    id: 'detailed-type',
    icon: 'Target',
    iconType: 'lucide',
    titleKey: 'features.detailedType.title',
    descriptionKey: 'features.detailedType.description',
    tier: 'premium',
  },
  {
    id: 'breed-comparison',
    icon: 'Dog',
    iconType: 'lucide',
    titleKey: 'features.breedComparison.title',
    descriptionKey: 'features.breedComparison.description',
    tier: 'premium',
  },
  {
    id: 'route-suggestion',
    icon: 'Map',
    iconType: 'lucide',
    titleKey: 'features.routeSuggestion.title',
    descriptionKey: 'features.routeSuggestion.description',
    tier: 'premium',
  },
  {
    id: 'heatmap',
    icon: 'Flame',
    iconType: 'lucide',
    titleKey: 'features.heatmap.title',
    descriptionKey: 'features.heatmap.description',
    tier: 'premium',
  },
  {
    id: 'data-export',
    icon: 'Save',
    iconType: 'lucide',
    titleKey: 'features.dataExport.title',
    descriptionKey: 'features.dataExport.description',
    tier: 'premium',
  },
  {
    id: 'custom-share',
    icon: 'Sparkles',
    iconType: 'lucide',
    titleKey: 'features.customShare.title',
    descriptionKey: 'features.customShare.description',
    tier: 'premium',
  },
];

export const freeFeatures = features.filter((f) => f.tier === 'free');
export const premiumFeatures = features.filter((f) => f.tier === 'premium');
