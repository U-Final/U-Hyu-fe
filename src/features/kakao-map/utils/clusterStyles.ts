// 색상 정의 – Tailwind 변수를 그대로 쓰기 힘들어서 HEX로 직접 지정
const PRIMARY = '#e6007e'; // var(--bg-primary)
const PRIMARY_L10 = '#f9a8d4'; // 살짝 연한 (200 계열)
const PRIMARY_L25 = '#fbcfe8'; // 더 연한 (100 계열)

export const clusterStyles = [
  /* count < 10 */
  {
    width: '38px',
    height: '38px',
    background: PRIMARY_L25,
    border: `2px solid ${PRIMARY}`,
    borderRadius: '50%',
    color: '#fff',
    textAlign: 'center',
    fontWeight: 600,
    fontSize: '13px',
    lineHeight: '38px',
  },
  /* 10 ≤ count < 30 */
  {
    width: '46px',
    height: '46px',
    background: PRIMARY_L10,
    border: `2px solid ${PRIMARY}`,
    borderRadius: '50%',
    color: '#fff',
    textAlign: 'center',
    fontWeight: 600,
    fontSize: '15px',
    lineHeight: '46px',
  },
  /* count ≥ 30 */
  {
    width: '56px',
    height: '56px',
    background: PRIMARY, // 핵심 컬러 풀농도
    border: `2px solid ${PRIMARY}`,
    borderRadius: '50%',
    color: '#fff',
    textAlign: 'center',
    fontWeight: 600,
    fontSize: '17px',
    lineHeight: '56px',
  },
];
