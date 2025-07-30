export const formatGradeDescriptions = (text: string | null): string => {
  if (!text) return '';

  const cleanedText = text.replace(/\\n|\n/g, ' ');

  const gradePattern = /(VVIP|VIP|우수)\s*:\s*/g;
  const matches = [...cleanedText.matchAll(gradePattern)];
  const parts: string[] = [];

  let lastIndex = 0;
  matches.forEach((match, index) => {
    if (lastIndex < match.index!) {
      parts.push(cleanedText.substring(lastIndex, match.index!).trim());
    }
    parts.push(match[1]);
    lastIndex = match.index! + match[0].length;

    const nextMatch = matches[index + 1];
    const endIndex = nextMatch ? nextMatch.index! : cleanedText.length;
    parts.push(cleanedText.substring(lastIndex, endIndex).trim());
    lastIndex = endIndex;
  });

  let result = '';

  for (let i = 0; i < parts.length; i += 2) {
    const grade = parts[i];
    const description = parts[i + 1]?.trim() ?? '';
    result += `${grade}: ${description}\n`;
  }

  return result.trim();
};
