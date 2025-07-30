export const formatGradeDescriptions = (text: string | null): string => {
  if (!text) return '';

  const cleanedText = text.replace(/\\n|\n/g, ' ');

  const regex = /(VVIP|VIP|우수)\s*:\s*/g;
  const parts = cleanedText.split(regex).filter(Boolean);

  let result = '';

  for (let i = 0; i < parts.length; i += 2) {
    const grade = parts[i];
    const description = parts[i + 1]?.trim() ?? '';
    result += `${grade}: ${description}\n`;
  }

  return result.trim();
};
