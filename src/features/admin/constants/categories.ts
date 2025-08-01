export const ADMIN_CATEGORIES = [
  { id: 1, name: 'APP/기기', color: 'var(--category-app)' },
  { id: 2, name: '영화 / 미디어', color: 'var(--category-movie)' },
  { id: 3, name: '테마파크', color: 'var(--category-themepark)' },
  { id: 4, name: '워터파크/아쿠아리움', color: 'var(--category-waterpark)' },
  { id: 5, name: '액티비티', color: 'var(--category-activity)' },
  { id: 6, name: '뷰티(피부과, 클리닉)', color: 'var(--category-beauty)' },
  { id: 7, name: '건강(제약, 영양제 등)', color: 'var(--category-health)' },
  { id: 8, name: '쇼핑', color: 'var(--category-shopping)' },
  { id: 9, name: '생활/편의', color: 'var(--category-convenience)' },
  { id: 10, name: '베이커리/디저트', color: 'var(--category-bakery)' },
  { id: 11, name: '음식점', color: 'var(--category-restaurant)' },
  { id: 12, name: '공연/전시', color: 'var(--category-performance)' },
  { id: 13, name: '교육', color: 'var(--category-education)' },
  { id: 14, name: '여행/교통', color: 'var(--category-travel)' },
];

export const GRADE_OPTIONS = [
  { value: 'GOOD', label: 'GOOD', color: 'bg-gray-100 text-gray-800' },
  { value: 'VIP', label: 'VIP', color: 'bg-blue-100 text-blue-800' },
  { value: 'VVIP', label: 'VVIP', color: 'bg-purple-100 text-purple-800' },
];

export type CategoryId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 'all';

// 실제 브랜드 리스트
export const CATEGORY_BRANDS = {
  1: ['V컬러링 멤버십 프로모션', '원스토어', '지니뮤직'],
  2: ['CGV', '롯데시네마', '메가박스', '씨네폭스'],
  3: ['뽀로로파크', '아르떼 키즈파크 제주', '원더빌리지', '원더파크', '서울랜드', '뽀로로아쿠아빌리지', '롯데월드 아이스링크', '롯데월드 어드벤쳐 부산'],
  4: ['아쿠아필드', '스파랜드', '클럽디 오아시스', '코엑스아쿠아리움', '아쿠아플라넷', '부산아쿠아리움', '캐리비안베이', '대구아쿠아리움', '롯데월드 아쿠아리움'],
  5: ['스카이라인 루지', '클룩', '부산 엑스 더 스카이', '대관령 하늘목장', 'LG트윈스 경기 티켓 할인', '이월드', '제주민속촌', 'SEOUL SKY', '한강유람선 이크루즈'],
  6: ['오가나셀 피부과 의원 청담점', '데이원클리닉', '포쉬네일', '유엔아이피부과의원'],
  7: ['동아제약 디몰', 'LG생활건강샵 U+패밀리샵', '필리'],
  8: ['GS THE FRESH', 'VYVY', '롯데백화점몰', 'U+콕', '현대면세점', '셀렉스', '신라면세점(오프라인)', '광동상회', '키디키디', '신라아이파크면세점(온라인)', '롯데면세점(오프라인)', '롯데면세점(온라인)', '신라면세점', '신라아이파크면세점(오프라인)', '신세계면세점(온라인)', '신세계면세점(오프라인)', '더반찬&', '전자랜드'],
  9: ['GS25', '펫생각', '셸로', '다락', 'KCC글라스', '뮤직벨링', '어바웃펫', 'GS POSTBOX택배', '가연결혼정보', '포토블루', '통인익스프레스', '쿠프마케팅', '청소연구소', '자란다', '오토오아시스', 'KB손해보험'],
  10: ['파리바게트', '뚜레쥬르', '베스킨라빈스', '파리크라상', '브레댄코'],
  11: ['VIPS', '더플레이스', '제일제면소', '유가네닭갈비', '라그릴리아', '반올림피자', '서울드레곤시티', '굽네치킨', '컬리너리스퀘어', '세빛섬', '베베쿡', '도미노피자', '미스터피자', '파파존스', '피자헛', '온더보더', '푸드엠파이어', '싱카이', '키사라'],
  12: ['빛의 벙커', '빛의 시어터', '그라운드시소', '2025 딜라이트 서울', '페인터즈', 'U+ 모바일tv', 'IPTV', '뮤지엄원', '케이팝머치', '블라이스'],
  13: ['젠지', '월스트리트 잉글리시', 'DBR동아비즈니스리뷰', 'HBR하버드비즈니스리뷰', 'YBM NET', '허그맘', '초심스터디카페'],
  14: ['SK렌터카', '야놀자글로벌 해외 숙박', '야놀자고글로벌 국내 숙박', '티웨이항공', '롯데렌터카', '투루카', '트립닷컴', '카모아', '곤지암리조트']
} as const; 