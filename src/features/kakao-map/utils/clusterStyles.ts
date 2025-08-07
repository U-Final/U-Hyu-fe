const P_LIGHT = '#f9c4de';
const P_BASE = '#ef5aa7';
const P_DEEP = '#e6007e';

const textLightBG = {
  color: P_DEEP,
  textAlign: 'center',
  fontWeight: 700,
  letterSpacing: '-0.15px',
  textShadow: '0 0 1px rgba(0,0,0,0.05)',
};
const textDarkBG = {
  color: '#fafafa',
  textAlign: 'center',
  fontWeight: 600,
  letterSpacing: '-0.15px',
};

export const clusterStyles = [
  {
    width: '36px',
    height: '36px',
    background: P_LIGHT,
    border: '1px solid rgba(0,0,0,0.05)',
    borderRadius: '50%',
    fontSize: '13px',
    lineHeight: '36px',
    ...textLightBG,
  },

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
];
