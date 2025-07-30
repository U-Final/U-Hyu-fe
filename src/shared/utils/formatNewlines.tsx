/**
 * 문자열 내 \n 을 <br /> 태그로 바꿔주는 유틸
 */
export const formatNewlines = (text: string) => {
  const lines = text.split('\\n');
  return lines.map((line, index) => (
    <span key={index}>
      {line}
      {index !== lines.length - 1 && <br />}
    </span>
  ));
};
