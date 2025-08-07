import he from 'he';

/**
 * usageMethod나 usageLimit 등의 긴 설명 텍스트를 보기 좋게 줄바꿈 처리하고 디코딩하는 유틸
 */
export const formatUsageText = (text: string | null): string => {
  if (!text) return '';

  let decoded = he.decode(text);

  decoded = decoded.replace(/(\\n|\n|<br\s*\/?>)/g, '');

  decoded = decoded
    .replace(/\s*●\s*/g, '\n● ')
    .replace(/\s*■\s*/g, '\n■ ')
    .replace(/\s*▶\s*/g, '\n▶ ')
    .replace(/\s*\*\s*/g, '\n* ')
    .replace(/(?<!\d)\s*-\s*/g, '\n- ')
    .replace(/(^|\s)([1-5])\.\s*/g, '\n$2. ');

  decoded = decoded.replace(/\s{2,}/g, ' ');

  return decoded.trim();
};
