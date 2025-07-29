import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

// UI 전용 마커 컴포넌트들
interface UIKeywordMarkerProps {
  index: number;
  isSelected?: boolean;
  onClick?: () => void;
}

const UIKeywordMarker: React.FC<UIKeywordMarkerProps> = ({ 
  index, 
  isSelected = false, 
  onClick 
}) => {
  return (
    <div
      className={`
        w-8 h-8 rounded-full border-2 cursor-pointer
        flex items-center justify-center text-sm font-bold
        transition-all duration-200 hover:scale-110
        ${isSelected 
          ? 'bg-blue-600 border-blue-700 text-white shadow-lg' 
          : 'bg-white border-red-500 text-red-500 shadow-md hover:bg-red-50'
        }
      `}
      onClick={onClick}
    >
      {index}
    </div>
  );
};

interface UIClusterMarkerProps {
  count: number;
  onClick?: () => void;
}

const UIClusterMarker: React.FC<UIClusterMarkerProps> = ({ 
  count, 
  onClick 
}) => {
  return (
    <div
      className="
        w-10 h-10 rounded-full bg-purple-600 border-2 border-purple-700
        flex items-center justify-center text-white font-bold text-sm
        cursor-pointer transition-all duration-200 hover:scale-110 shadow-lg
      "
      onClick={onClick}
    >
      {count}
    </div>
  );
};

const meta: Meta<typeof UIKeywordMarker> = {
  title: 'Features/KakaoMap/Search/KeywordMarker',
  component: UIKeywordMarker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '키워드 검색 결과를 지도에 표시하는 마커 컴포넌트입니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        padding: '50px', 
        background: '#e8f5e8',
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
type Story = StoryObj<typeof UIKeywordMarker>;

export const Default: Story = {
  args: {
    index: 1,
    isSelected: false,
    onClick: () => console.log('Marker clicked'),
  },
};

export const Selected: Story = {
  args: {
    index: 2,
    isSelected: true,
    onClick: () => console.log('Selected marker clicked'),
  },
};

export const HighNumber: Story = {
  args: {
    index: 15,
    isSelected: false,
    onClick: () => console.log('High number marker clicked'),
  },
};

export const SelectedHighNumber: Story = {
  args: {
    index: 99,
    isSelected: true,
    onClick: () => console.log('Selected high number marker clicked'),
  },
};

// 클러스터 마커 스토리
const clusterMeta: Meta<typeof UIClusterMarker> = {
  title: 'Features/KakaoMap/Search/ClusterMarker',
  component: UIClusterMarker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '여러 장소를 그룹화하여 표시하는 클러스터 마커 컴포넌트입니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        padding: '50px', 
        background: '#e8f5e8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Story />
      </div>
    ),
  ],
};

export const ClusterSmall: StoryObj<typeof UIClusterMarker> = {
  ...clusterMeta,
  args: {
    count: 3,
    onClick: () => console.log('Small cluster clicked'),
  },
};

export const ClusterMedium: StoryObj<typeof UIClusterMarker> = {
  ...clusterMeta,
  args: {
    count: 15,
    onClick: () => console.log('Medium cluster clicked'),
  },
};

export const ClusterLarge: StoryObj<typeof UIClusterMarker> = {
  ...clusterMeta,
  args: {
    count: 99,
    onClick: () => console.log('Large cluster clicked'),
  },
};

// 마커 비교 스토리
export const MarkerComparison: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '20px', 
      alignItems: 'center',
      padding: '50px',
      background: '#e8f5e8'
    }}>
      <div style={{ textAlign: 'center' }}>
        <UIKeywordMarker index={1} isSelected={false} />
        <div style={{ marginTop: '10px', fontSize: '12px' }}>기본</div>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <UIKeywordMarker index={2} isSelected={true} />
        <div style={{ marginTop: '10px', fontSize: '12px' }}>선택됨</div>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <UIClusterMarker count={5} />
        <div style={{ marginTop: '10px', fontSize: '12px' }}>클러스터</div>
      </div>
    </div>
  ),
};