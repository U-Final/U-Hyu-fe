/**
 * 문자열 내 줄바꿈 및 ①, ②, ③... 앞에 줄바꿈을 <br /> 태그로 바꿔주는 유틸
 */
export const formatNewlines = (text: string) => {
  // ①, ②, ③... 앞에 \n 추가
  const normalized = text
    .replace(/\\n/g, '')
    .replace(/\\/g, '\n')
    .replace(/※/g, '\n※')
    .replace(/([②③④⑤⑥⑦⑧⑨⑩])/g, '\n$1'); // 번호 앞에 줄바꿈 삽입

  const lines = normalized.split('\n');

  return lines.map((line, index) => (
    <span key={index}>
      {line}
      {index !== lines.length - 1 && <br />}
    </span>
  ));
};
