import he from 'he';

/**
 * usageMethod나 usageLimit 등의 긴 설명 텍스트를 보기 좋게 줄바꿈 처리하고 디코딩하는 유틸
 */
export const formatUsageText = (text: string | null): string => {
  if (!text) return '';

  // 1. HTML entity 디코딩 (&nbsp; &gt; &#39; 등)
  let decoded = he.decode(text);

  // 2. \n 혹은 \\n 등 제거 → 줄바꿈 의도는 기호로 통일
  decoded = decoded.replace(/\\n|\n/g, ' ');

  // 3. 보기 좋게 줄바꿈 처리 (기호 앞에 줄바꿈 추가)
  decoded = decoded.replace(/\s*■\s*/g, '\n■ ').replace(/\s*▶\s*/g, '\n▶ ');

  // 4. 여러 연속 공백 정리
  decoded = decoded.replace(/\s{2,}/g, ' ');

  // 5. 앞뒤 공백 제거
  return decoded.trim();
};
