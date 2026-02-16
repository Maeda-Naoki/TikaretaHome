export interface WalkingType {
  id: string;
  nameKey: string;
  descriptionKey: string;
  icon: string;
  iconType: 'lucide' | 'emoji';
  color: string;
}

export const walkingTypes: WalkingType[] = [
  {
    id: 'shadeHunter',
    nameKey: 'walkingTypes.shadeHunter.name',
    descriptionKey: 'walkingTypes.shadeHunter.description',
    icon: 'TreePine',
    iconType: 'lucide',
    color: 'secondary-500',
  },
  {
    id: 'explorer',
    nameKey: 'walkingTypes.explorer.name',
    descriptionKey: 'walkingTypes.explorer.description',
    icon: 'Compass',
    iconType: 'lucide',
    color: 'primary-500',
  },
  {
    id: 'morningEnjoyer',
    nameKey: 'walkingTypes.morningEnjoyer.name',
    descriptionKey: 'walkingTypes.morningEnjoyer.description',
    icon: 'Sunrise',
    iconType: 'lucide',
    color: 'primary-400',
  },
  {
    id: 'shortBurst',
    nameKey: 'walkingTypes.shortBurst.name',
    descriptionKey: 'walkingTypes.shortBurst.description',
    icon: 'Zap',
    iconType: 'lucide',
    color: 'secondary-400',
  },
  {
    id: 'socialButterfly',
    nameKey: 'walkingTypes.socialButterfly.name',
    descriptionKey: 'walkingTypes.socialButterfly.description',
    icon: '🦋',
    iconType: 'emoji',
    color: 'primary-300',
  },
  {
    id: 'steadyWalker',
    nameKey: 'walkingTypes.steadyWalker.name',
    descriptionKey: 'walkingTypes.steadyWalker.description',
    icon: 'Footprints',
    iconType: 'lucide',
    color: 'secondary-300',
  },
  {
    id: 'nightOwl',
    nameKey: 'walkingTypes.nightOwl.name',
    descriptionKey: 'walkingTypes.nightOwl.description',
    icon: 'Moon',
    iconType: 'lucide',
    color: 'warm-gray-600',
  },
  {
    id: 'weatherFlexible',
    nameKey: 'walkingTypes.weatherFlexible.name',
    descriptionKey: 'walkingTypes.weatherFlexible.description',
    icon: 'Cloud',
    iconType: 'lucide',
    color: 'warm-gray-500',
  },
];
