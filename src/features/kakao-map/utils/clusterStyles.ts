/* 프라이머리 톤 */
const P_LIGHT = '#fbeff6';
const P_BASE = '#ef5aa7';
const P_DEEP = '#e6007e';

/* 공통 텍스트(딥핑크·화이트 두 세트) */
const textLightBG = {
  color: P_DEEP, // 💡 딥핑크
  textAlign: 'center',
  fontWeight: 700,
  letterSpacing: '-0.15px',
  textShadow: '0 0 1px rgba(0,0,0,0.05)', // 살짝 테두리
};
const textDarkBG = {
  color: '#fafafa',
  textAlign: 'center',
  fontWeight: 600,
  letterSpacing: '-0.15px',
};

/* 단계별 클러스터 스타일 */
export const clusterStyles = [
  /* ① count < 10  */
  {
    width: '36px',
    height: '36px',
    background: P_LIGHT,
    border: '1px solid rgba(0,0,0,0.05)',
    borderRadius: '50%',
    fontSize: '13px',
    lineHeight: '36px',
    ...textLightBG, // ← 대비 높은 텍스트
  },

  /* ② 10 ≤ count < 30 */
  {
    width: '44px',
    height: '44px',
    background: P_BASE,
    border: '1px solid rgba(0,0,0,0.06)',
    borderRadius: '50%',
    fontSize: '15px',
    lineHeight: '44px',
    ...textDarkBG,
  },

  /* ③ count ≥ 30 */
  {
    width: '54px',
    height: '54px',
    background: P_DEEP,
    border: '1px solid rgba(0,0,0,0.08)',
    borderRadius: '50%',
    fontSize: '16px',
    lineHeight: '54px',
    ...textDarkBG,
  },
] as const;
