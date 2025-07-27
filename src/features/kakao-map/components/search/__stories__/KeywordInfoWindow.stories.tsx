import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { X } from 'lucide-react';

import type { NormalizedPlace } from '../../../api/types';

// 스토리북용 간단한 UI 컴포넌트 (실제 KeywordInfoWindow와 동일한 로직)
interface KeywordInfoWindowProps {
  place: NormalizedPlace;
  onClose: () => void;
  onClick?: (place: NormalizedPlace) => void;
}

const UIKeywordInfoWindow: React.FC<KeywordInfoWindowProps> = ({
  place,
  onClose,
  onClick,
}) => {
  const formatCategory = (category: string) => {
    const parts = category.split(' > ');
    return parts[parts.length - 1] || category;
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.(place);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div className="relative z-50 max-w-64">
      {/* 말풍선 꼬리 */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
        <div className="w-0 h-0 border-l-6 border-r-6 border-t-8 border-transparent border-t-white drop-shadow-sm" />
      </div>

      {/* 메인 콘텐츠 */}
      <div 
        className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={handleClick}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0 pr-2">
            <h4 className="font-medium text-gray-900 text-sm truncate mb-1">
              {place.name}
            </h4>
            <p className="text-xs text-gray-500 truncate">
              {formatCategory(place.category)}
            </p>
          </div>
          
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="닫기"
          >
            <X size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

// 모킹 데이터
const mockPlace: NormalizedPlace = {
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
};

const restaurantPlace: NormalizedPlace = {
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
};

const longNamePlace: NormalizedPlace = {
  id: 'long-name-place',
  name: '매우 긴 이름을 가진 장소로 텍스트 오버플로우를 테스트하는 장소',
  category: '매우 긴 카테고리 > 하위 카테고리 > 세부 카테고리 > 더 세부적인 카테고리',
  address: '서울 강남구 매우 긴 주소명을 가진 동 123-456',
  roadAddress: '서울 강남구 매우 긴 도로명주소 123',
  phone: '02-1234-5678',
  latitude: 37.5,
  longitude: 127.0,
  distance: 500,
  url: 'http://place.map.kakao.com/long-name-place',
};

const meta: Meta<typeof UIKeywordInfoWindow> = {
  title: 'Features/KakaoMap/Search/KeywordInfoWindow',
  component: UIKeywordInfoWindow,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '간단한 버전의 키워드 검색 결과 인포윈도우 컴포넌트입니다. 장소명, 카테고리, 닫기 버튼만 포함합니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        padding: '100px', 
        background: '#f0f0f0',
        minHeight: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UIKeywordInfoWindow>;

export const Default: Story = {
  args: {
    place: mockPlace,
    onClose: () => console.log('Close clicked'),
    onClick: (place) => console.log('InfoWindow clicked:', place),
  },
};

export const Restaurant: Story = {
  args: {
    ...Default.args,
    place: restaurantPlace,
  },
};

export const LongName: Story = {
  args: {
    ...Default.args,
    place: longNamePlace,
  },
};

export const WithoutClick: Story = {
  args: {
    place: mockPlace,
    onClose: () => console.log('Close clicked'),
    // onClick 없음
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [selectedPlace, setSelectedPlace] = React.useState<NormalizedPlace | null>(mockPlace);

    return (
      <div style={{ textAlign: 'center' }}>
        {selectedPlace ? (
          <UIKeywordInfoWindow
            place={selectedPlace}
            onClose={() => {
              console.log('Closed');
              setSelectedPlace(null);
            }}
            onClick={(place) => {
              console.log('Clicked:', place);
              alert(`클릭됨: ${place.name}`);
            }}
          />
        ) : (
          <div style={{ padding: '20px' }}>
            <p style={{ marginBottom: '20px', color: '#666' }}>
              인포윈도우가 닫혔습니다
            </p>
            <button
              onClick={() => setSelectedPlace(mockPlace)}
              style={{
                padding: '8px 16px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              다시 열기
            </button>
          </div>
        )}
      </div>
    );
  },
};

// 다양한 장소 타입 비교
export const PlaceComparison: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '50px', 
      alignItems: 'flex-start',
      padding: '50px',
      background: '#f0f0f0',
      flexWrap: 'wrap'
    }}>
      <div style={{ textAlign: 'center' }}>
        <UIKeywordInfoWindow
          place={mockPlace}
          onClose={() => console.log('Station closed')}
          onClick={(place) => console.log('Station clicked:', place)}
        />
        <div style={{ marginTop: '20px', fontSize: '12px', fontWeight: 'bold' }}>
          지하철역
        </div>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <UIKeywordInfoWindow
          place={restaurantPlace}
          onClose={() => console.log('Restaurant closed')}
          onClick={(place) => console.log('Restaurant clicked:', place)}
        />
        <div style={{ marginTop: '20px', fontSize: '12px', fontWeight: 'bold' }}>
          음식점
        </div>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <UIKeywordInfoWindow
          place={longNamePlace}
          onClose={() => console.log('Long name closed')}
          onClick={(place) => console.log('Long name clicked:', place)}
        />
        <div style={{ marginTop: '20px', fontSize: '12px', fontWeight: 'bold' }}>
          긴 이름
        </div>
      </div>
    </div>
  ),
};