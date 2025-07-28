import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import type { NormalizedPlace } from '../../../api/types';
import { KeywordSearchInput } from '../MapSearchInput';
import { SearchResultList } from '../SearchResultList';

// UI 전용 검색 컨테이너 컴포넌트
interface UIKeywordSearchContainerProps {
  initialKeyword?: string;
  showResults?: boolean;
  loading?: boolean;
  places?: NormalizedPlace[];
}

const UIKeywordSearchContainer: React.FC<UIKeywordSearchContainerProps> = ({
  initialKeyword = '',
  showResults = false,
  loading = false,
  places = [],
}) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [searchLoading, setSearchLoading] = useState(loading);
  const [searchResults, setSearchResults] = useState<NormalizedPlace[]>(places);
  const [showSearchResults, setShowSearchResults] = useState(showResults);

  const handleSearch = (searchKeyword: string) => {
    console.log('Search:', searchKeyword);
    setSearchLoading(true);

    // UI 데모용 - 실제로는 API 호출
    setTimeout(() => {
      setSearchResults(places);
      setShowSearchResults(true);
      setSearchLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setKeyword('');
    setShowSearchResults(false);
    setSearchResults([]);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* 검색 입력 */}
      <div className="mb-4">
        <KeywordSearchInput
          value={keyword}
          onChange={setKeyword}
          onSearch={handleSearch}
          onCancel={handleCancel}
          loading={searchLoading}
          placeholder="장소, 업체명을 검색하세요"
        />
      </div>

      {/* 검색 결과 */}
      {showSearchResults && (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <SearchResultList
            results={searchResults}
            loading={searchLoading}
            onItemClick={(place: NormalizedPlace) =>
              console.log('Place clicked:', place)
            }
          />
        </div>
      )}
    </div>
  );
};

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

const meta: Meta<typeof UIKeywordSearchContainer> = {
  title: 'Features/KakaoMap/Search/KeywordSearchContainer',
  component: UIKeywordSearchContainer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '카카오 키워드 검색 UI 전체를 통합한 컨테이너 컴포넌트입니다.',
      },
    },
  },
  decorators: [
    Story => (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          padding: '20px',
          background: '#f5f5f5',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UIKeywordSearchContainer>;

export const Default: Story = {
  args: {
    initialKeyword: '',
    showResults: false,
    loading: false,
    places: mockPlaces,
  },
};

export const WithKeyword: Story = {
  args: {
    initialKeyword: '선릉역',
    showResults: false,
    loading: false,
    places: mockPlaces,
  },
};

export const WithResults: Story = {
  args: {
    initialKeyword: '선릉역',
    showResults: true,
    loading: false,
    places: mockPlaces,
  },
};

export const Loading: Story = {
  args: {
    initialKeyword: '선릉역',
    showResults: true,
    loading: true,
    places: [],
  },
};

export const EmptyResults: Story = {
  args: {
    initialKeyword: '존재하지않는검색어',
    showResults: true,
    loading: false,
    places: [],
  },
};

export const ManyResults: Story = {
  args: {
    initialKeyword: '카페',
    showResults: true,
    loading: false,
    places: [
      ...mockPlaces,
      ...Array(10)
        .fill(null)
        .map((_, index) => ({
          id: `cafe-${index + 1}`,
          name: `카페 ${index + 1}호점`,
          category: '음식점 > 카페',
          address: `서울 강남구 역삼동 ${100 + index}`,
          roadAddress: `서울 강남구 테헤란로 ${200 + index * 2}`,
          phone: `02-555-${String(index + 1).padStart(4, '0')}`,
          latitude: 37.5665 + index * 0.001,
          longitude: 126.978 + index * 0.001,
          distance: 500 + index * 100,
          url: `http://place.map.kakao.com/cafe-${index + 1}`,
        })),
    ],
  },
};
