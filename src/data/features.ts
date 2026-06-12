import type { IconName } from './icons';

export type FeatureTier = 'free' | 'standard' | 'pro';

export interface DesignFeature {
  tier: FeatureTier;
  icon: IconName;
  title: string;
  body: string;
}

export const designFeatures: DesignFeature[] = [
  {
    tier: 'free',
    icon: 'footprints',
    title: 'おさんぽ記録',
    body: 'いつものおさんぽコースをかんたんに残せます。',
  },
  {
    tier: 'free',
    icon: 'map-pin',
    title: 'スポット登録',
    body: '立ち寄った場所・写真・理由を残して思い出を保存。',
  },
  {
    tier: 'free',
    icon: 'cloud-sun',
    title: '天気・気温の自動記録',
    body: 'おさんぽ中の天候を自動で残します。',
  },
  {
    tier: 'free',
    icon: 'history',
    title: '全期間データ閲覧',
    body: '無料でも過去の全記録をいつでも見返せます。',
  },
  {
    tier: 'free',
    icon: 'target',
    title: '基本タイプ診断',
    body: '8つのおさんぽタイプから愛犬の個性を診断。',
  },
  {
    tier: 'free',
    icon: 'users',
    title: 'コミュニティ',
    body: '同じ飼い主同士でタイムラインやリアクションで交流。',
  },
  {
    tier: 'standard',
    icon: 'bar-chart-3',
    title: '全期間ふりかえり',
    body: 'これまでの全おさんぽをじっくり振り返れる詳細統計。',
  },
  {
    tier: 'standard',
    icon: 'sparkles',
    title: '詳細タイプ分析',
    body: '愛犬の個性をより深く分析し、おさんぽへのアドバイスも。',
  },
  {
    tier: 'pro',
    icon: 'route',
    title: '苦手スポット回避ルート',
    body: '苦手な場所を避けて歩けるルートを自動提案。',
  },
  {
    tier: 'pro',
    icon: 'flame',
    title: 'みんなの休憩ポイント',
    body: '全ユーザーから人気スポットをヒートマップで可視化。',
  },
  {
    tier: 'pro',
    icon: 'trending-up',
    title: 'トレンド分析',
    body: '先月比・季節別の変化を可視化。傾向の変化も発見。',
  },
];

export const tierLabel: Record<FeatureTier, string> = {
  free: 'FREE',
  standard: 'STANDARD',
  pro: 'PRO',
};

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
];

export const freeFeatures = features.filter((f) => f.tier === 'free');
export const premiumFeatures = features.filter((f) => f.tier === 'premium');
