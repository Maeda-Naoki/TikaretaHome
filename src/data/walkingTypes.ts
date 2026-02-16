export interface WalkingType {
  id: string;
  nameKey: string;
  descriptionKey: string;
  icon: string;
  color: string;
}

export const walkingTypes: WalkingType[] = [
  {
    id: 'shade-hunter',
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
    id: 'morning-enjoyer',
    nameKey: 'walkingTypes.morningEnjoyer.name',
    descriptionKey: 'walkingTypes.morningEnjoyer.description',
    icon: '🌅',
    color: 'primary-400',
  },
  {
    id: 'short-burst',
    nameKey: 'walkingTypes.shortBurst.name',
    descriptionKey: 'walkingTypes.shortBurst.description',
    icon: '⚡',
    color: 'secondary-400',
  },
  {
    id: 'social-butterfly',
    nameKey: 'walkingTypes.socialButterfly.name',
    descriptionKey: 'walkingTypes.socialButterfly.description',
    icon: '🦋',
    color: 'primary-300',
  },
  {
    id: 'steady-walker',
    nameKey: 'walkingTypes.steadyWalker.name',
    descriptionKey: 'walkingTypes.steadyWalker.description',
    icon: '🚶',
    color: 'secondary-300',
  },
  {
    id: 'night-owl',
    nameKey: 'walkingTypes.nightOwl.name',
    descriptionKey: 'walkingTypes.nightOwl.description',
    icon: '🌙',
    color: 'warm-gray-600',
  },
  {
    id: 'weather-flexible',
    nameKey: 'walkingTypes.weatherFlexible.name',
    descriptionKey: 'walkingTypes.weatherFlexible.description',
    icon: '☁️',
    color: 'warm-gray-500',
  },
];
