export const formatGradeDescriptions = (text: string | null): string => {
  if (!text) return '';

  // 줄바꿈 문자 및 백슬래시 정리
  const cleanedText = text
    .replace(/\\n|\\\\n/g, '\n') // \n → 실제 줄바꿈으로

    .replace(/\\(?!n)/g, '\n'); // 나머지 \ → 제거 (예: "\t", "\a" 등 불필요한 이스케이프)

  // 등급 패턴 (콤마 앞도 허용)
  const gradePattern = /,?\s*(VVIP|VIP|우수)\s*:\s*/g;
  const matches = [...cleanedText.matchAll(gradePattern)];
  const parts: string[] = [];

  let lastIndex = 0;
  matches.forEach((match, index) => {
    const matchIndex = match.index ?? 0;
    if (lastIndex < matchIndex) {
      parts.push(cleanedText.substring(lastIndex, matchIndex).trim());
    }
    parts.push(match[1]); // 등급 (VVIP|VIP|우수)
    lastIndex = matchIndex + match[0].length;

    const nextMatch = matches[index + 1];
    const endIndex = nextMatch?.index ?? cleanedText.length;
    parts.push(cleanedText.substring(lastIndex, endIndex).trim());
    lastIndex = endIndex;
  });

  const gradeMap = new Map<string, string>();

  for (let i = 0; i < parts.length; i += 2) {
    const grade = parts[i];
    let description = parts[i + 1]?.trim() ?? '';

    // '②'~'⑨' 앞에 줄바꿈 추가 (이미 \n 있으면 그대로)
    description = description.replace(/(?<!\n)([②-⑨])/g, '\n$1');

    gradeMap.set(grade, description);
  }

  const uniqueDescriptions = new Set(gradeMap.values());

  // 모든 등급이 동일한 혜택이면 하나만 보여주기
  if (uniqueDescriptions.size === 1) {
    return `${[...uniqueDescriptions][0]}`;
  }

  // 각 등급별 혜택 출력
  let result = '';
  for (const [grade, description] of gradeMap.entries()) {
    result += `${grade}: ${description}\n`;
  }

  return result.trim();
};
