export const formatGradeDescriptions = (text: string | null): string => {
  if (!text) return '';

  const cleanedText = text.replace(/\\n|\\\\n/g, '\n');

  const gradePattern = /,?\s*(VVIP|VIP|우수)\s*:\s*/g;
  const matches = [...cleanedText.matchAll(gradePattern)];
  const parts: string[] = [];

  let lastIndex = 0;
  matches.forEach((match, index) => {
    const matchIndex = match.index ?? 0;
    if (lastIndex < matchIndex) {
      parts.push(cleanedText.substring(lastIndex, matchIndex).trim());
    }
    parts.push(match[1]);
    lastIndex = matchIndex + match[0].length;

    const nextMatch = matches[index + 1];
    const endIndex = nextMatch?.index ?? cleanedText.length;
    parts.push(cleanedText.substring(lastIndex, endIndex).trim());
    lastIndex = endIndex;
  });

  const gradeMap = new Map<string, string>();

  for (let i = 0; i < parts.length; i += 2) {
    const grade = parts[i];
    let desc = parts[i + 1]?.trim() ?? '';
    desc = desc.replace(/(?<!\n)([①-⑨])/g, '\n$1'); // 줄바꿈
    gradeMap.set(grade, desc);
  }

  const allDescriptions = Array.from(gradeMap.values());

  const allSame = allDescriptions.every(desc => desc === allDescriptions[0]);

  if (allSame && allDescriptions.length > 0) {
    return allDescriptions[0].trim();
  }

  let result = '';
  for (const [grade, desc] of gradeMap.entries()) {
    result += `${grade}\n${desc.trim()}\n`;
  }

  return result.trim();
};
