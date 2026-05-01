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
  { emoji: '🌳', name: '日陰ハンター型', body: '暑さを避けて木陰を求める慎重派' },
  { emoji: '🧭', name: '探検家型', body: '新しい道を開拓するのが大好き' },
  { emoji: '🌅', name: '朝型エンジョイ派', body: '朝の散歩を最も楽しむタイプ' },
  { emoji: '⚡', name: 'ショートバースト型', body: '短時間で集中的に散歩するタイプ' },
  { emoji: '🐾', name: 'ソーシャル型', body: '他の犬との交流が大好き' },
  { emoji: '🛤️', name: '定番ルート型', body: 'いつものコースを安心して歩く' },
  { emoji: '🌙', name: '夜型散歩派', body: '夕方〜夜の散歩が多いタイプ' },
  { emoji: '☔', name: '天候フレキシブル型', body: '天気に左右されず散歩を楽しむ' },
];
