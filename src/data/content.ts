import type { IconName } from './icons';

export interface ValueItem {
  icon: IconName;
  title: string;
  body: string;
  num: string;
}

export const valueItems: ValueItem[] = [
  {
    icon: 'search',
    title: '傾向がわかる',
    body: 'なんとなく感じていた愛犬のおさんぽグセや好みが、データではっきり見えてきます。',
    num: '01',
  },
  {
    icon: 'target',
    title: '個性が診断される',
    body: '楽しみながら、愛犬だけのおさんぽの個性をルールベースで発見できます。',
    num: '02',
  },
  {
    icon: 'heart',
    title: '仲間とつながれる',
    body: '同じ理由で休憩した子の数を見て、「うちだけじゃない」と感じられる。',
    num: '03',
  },
];

export interface Step {
  num: string;
  title: string;
  body: string;
  icon: IconName;
}

export const steps: Step[] = [
  {
    num: '01',
    title: 'おさんぽを記録する',
    body: 'いつものおさんぽをアプリに残すだけ。GPS追跡 or 手動入力に対応。',
    icon: 'footprints',
  },
  {
    num: '02',
    title: 'スポットを登録',
    body: '立ち寄った場所・写真・理由を残して、思い出を保存。',
    icon: 'map-pin',
  },
  {
    num: '03',
    title: 'タイプが判明！',
    body: '記録を続けるうちに、愛犬の「おさんぽタイプ」が自動でわかります。',
    icon: 'sparkles',
  },
];

export interface DogType {
  emoji: string;
  name: string;
  body: string;
}

export const dogTypes: DogType[] = [
  { emoji: '🌳', name: '日陰ハンター', body: '暑さを避けて木陰を求める慎重派' },
  { emoji: '🧭', name: 'お鼻の名探偵', body: '気になる匂いをあちこち捜査' },
  { emoji: '🌅', name: '朝日ダッシャー', body: '朝の散歩を最も楽しむタイプ' },
  { emoji: '⚡', name: '無限スタミナモンスター', body: '休憩が少なく元気に歩き続ける' },
  { emoji: '🐾', name: 'なでなでコレクター', body: '人になでてもらうのが大好き' },
  { emoji: '🛤️', name: 'いつメン愛好家', body: 'いつものコースを安心して歩く' },
  { emoji: '🌙', name: '黄昏ロマンチスト', body: '夕暮れの散歩をゆっくり楽しむ' },
  { emoji: '☔', name: 'スローライフ賢者', body: 'マイペースに散歩を味わう' },
];
