import { loadDefaultJapaneseParser } from 'budoux';

const parser = loadDefaultJapaneseParser();
const boundary = '\u200B';

export function japanesePhrases(text: string): string[] {
  return (
    parser
      .parse(text)
      .join(boundary)
      // Keep おさんぽ together when the model splits the name or marketing copy.
      .replaceAll(`おさん${boundary}ぽ`, 'おさんぽ')
      .split(boundary)
  );
}
