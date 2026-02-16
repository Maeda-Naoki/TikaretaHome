export interface WalkingType {
  id: string;
  nameKey: string;
  descriptionKey: string;
  icon: string;
  color: string;
}

export const walkingTypes: WalkingType[] = [
  {
    id: 'shadeHunter',
    nameKey: 'walkingTypes.shadeHunter.name',
    descriptionKey: 'walkingTypes.shadeHunter.description',
    icon: '🌳',
    color: 'secondary-500',
  },
  {
    id: 'explorer',
    nameKey: 'walkingTypes.explorer.name',
    descriptionKey: 'walkingTypes.explorer.description',
    icon: '🧭',
    color: 'primary-500',
  },
  {
    id: 'morningEnjoyer',
    nameKey: 'walkingTypes.morningEnjoyer.name',
    descriptionKey: 'walkingTypes.morningEnjoyer.description',
    icon: '🌅',
    color: 'primary-400',
  },
  {
    id: 'shortBurst',
    nameKey: 'walkingTypes.shortBurst.name',
    descriptionKey: 'walkingTypes.shortBurst.description',
    icon: '⚡',
    color: 'secondary-400',
  },
  {
    id: 'socialButterfly',
    nameKey: 'walkingTypes.socialButterfly.name',
    descriptionKey: 'walkingTypes.socialButterfly.description',
    icon: '🦋',
    color: 'primary-300',
  },
  {
    id: 'steadyWalker',
    nameKey: 'walkingTypes.steadyWalker.name',
    descriptionKey: 'walkingTypes.steadyWalker.description',
    icon: '🚶',
    color: 'secondary-300',
  },
  {
    id: 'nightOwl',
    nameKey: 'walkingTypes.nightOwl.name',
    descriptionKey: 'walkingTypes.nightOwl.description',
    icon: '🌙',
    color: 'warm-gray-600',
  },
  {
    id: 'weatherFlexible',
    nameKey: 'walkingTypes.weatherFlexible.name',
    descriptionKey: 'walkingTypes.weatherFlexible.description',
    icon: '☁️',
    color: 'warm-gray-500',
  },
];
