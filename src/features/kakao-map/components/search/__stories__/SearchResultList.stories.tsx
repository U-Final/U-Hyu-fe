import type { Meta, StoryObj } from '@storybook/react-vite';

import type { NormalizedPlace } from '../../../api/types';
import { SearchResultList, SearchResultItem, SearchResultSummary } from '../SearchResultList';

// 모킹 데이터
const mockPlaces: NormalizedPlace[] = [
  {
    id: '21160804',
    name: '선릉역 2호선',
    category: '교통,수송 > 지하철,전철 > 수도권2호선',
    address: '서울 강남구 삼성동 172-66',
    roadAddress: '서울 강남구 테헤란로 지하 340',
    phone: '02-6110-2201',
    latitude: 37.504497373023206,
    longitude: 127.04896282498558,
    distance: 1640,
    url: 'http://place.map.kakao.com/21160804',
  },
  {
    id: '1434403617',
    name: '타코잇 선릉역점',
    category: '음식점 > 양식 > 멕시칸,브라질',
    address: '서울 강남구 대치동 894',
    roadAddress: '서울 강남구 삼성로85길 33',
    phone: '02-552-5905',
    latitude: 37.50428936457838,
    longitude: 127.05483350659937,
    distance: 1319,
    url: 'http://place.map.kakao.com/1434403617',
  },
  {
    id: '1767572797',
    name: '스노우폭스 선릉역점',
    category: '음식점 > 도시락',
    address: '서울 강남구 삼성동 142-41',
    roadAddress: '서울 강남구 테헤란로 415',
    phone: '',
    latitude: 37.5056315270557,
    longitude: 127.051577262875,
    distance: 1385,
    url: 'http://place.map.kakao.com/1767572797',
  },
];

const longNamePlace: NormalizedPlace = {
  id: 'long-name-place',
  name: '매우 긴 이름을 가진 장소로 텍스트 오버플로우를 테스트하는 장소',
  category: '매우 긴 카테고리 > 하위 카테고리 > 세부 카테고리',
  address: '서울 강남구 매우 긴 주소명을 가진 동 123-456',
  roadAddress: '서울 강남구 매우 긴 도로명주소 123',
  phone: '02-1234-5678',
  latitude: 37.5,
  longitude: 127.0,
  distance: 500,
  url: 'http://place.map.kakao.com/long-name-place',
};

const meta: Meta<typeof SearchResultList> = {
  title: 'Features/KakaoMap/Search/SearchResultList',
  component: SearchResultList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '카카오 키워드 검색 결과를 표시하는 리스트 컴포넌트입니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', minHeight: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SearchResultList>;

export const Default: Story = {
  args: {
    results: mockPlaces,
    loading: false,
    onItemClick: (place: NormalizedPlace) => console.log('Place clicked:', place),
    selectedPlaceId: undefined,
  },
};

export const Loading: Story = {
  args: {
    results: [],
    loading: true,
    onItemClick: (place: NormalizedPlace) => console.log('Place clicked:', place),
  },
};

export const Empty: Story = {
  args: {
    results: [],
    loading: false,
    onItemClick: (place: NormalizedPlace) => console.log('Place clicked:', place),
  },
};

export const WithSelection: Story = {
  args: {
    results: mockPlaces,
    loading: false,
    onItemClick: (place: NormalizedPlace) => console.log('Place clicked:', place),
    selectedPlaceId: '1434403617',
  },
};

export const LongNames: Story = {
  args: {
    results: [longNamePlace, ...mockPlaces],
    loading: false,
    onItemClick: (place: NormalizedPlace) => console.log('Place clicked:', place),
  },
};

// 개별 아이템 스토리
const itemMeta: Meta<typeof SearchResultItem> = {
  title: 'Features/KakaoMap/Search/SearchResultItem',
  component: SearchResultItem,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ItemDefault: StoryObj<typeof SearchResultItem> = {
  ...itemMeta,
  args: {
    place: mockPlaces[0],
    onClick: () => console.log('Item clicked'),
    isSelected: false,
    showDistance: true,
  },
};

export const ItemSelected: StoryObj<typeof SearchResultItem> = {
  ...itemMeta,
  args: {
    ...ItemDefault.args,
    isSelected: true,
  },
};

export const ItemWithoutPhone: StoryObj<typeof SearchResultItem> = {
  ...itemMeta,
  args: {
    ...ItemDefault.args,
    place: mockPlaces[2],
  },
};

export const ItemLongName: StoryObj<typeof SearchResultItem> = {
  ...itemMeta,
  args: {
    ...ItemDefault.args,
    place: longNamePlace,
  },
};

export const ItemWithoutDistance: StoryObj<typeof SearchResultItem> = {
  ...itemMeta,
  args: {
    ...ItemDefault.args,
    showDistance: false,
  },
};

// 검색 요약 스토리
const summaryMeta: Meta<typeof SearchResultSummary> = {
  title: 'Features/KakaoMap/Search/SearchResultSummary',
  component: SearchResultSummary,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const SummaryDefault: StoryObj<typeof SearchResultSummary> = {
  ...summaryMeta,
  args: {
    totalCount: 203,
    currentCount: 15,
    keyword: '선릉역',
  },
};

export const SummarySmallCount: StoryObj<typeof SearchResultSummary> = {
  ...summaryMeta,
  args: {
    totalCount: 5,
    currentCount: 5,
    keyword: '카페',
  },
};

export const SummaryLongKeyword: StoryObj<typeof SearchResultSummary> = {
  ...summaryMeta,
  args: {
    totalCount: 1247,
    currentCount: 15,
    keyword: '강남역 맛집 한식당',
  },
};