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

  let result = '';

  for (let i = 0; i < parts.length; i += 2) {
    const grade = parts[i];
    let description = parts[i + 1]?.trim() ?? '';

    description = description.replace(/(?<!\n)([①-⑨])/g, '\n$1');

    result += `${grade}: ${description}\n`;
  }

  return result.trim();
};
