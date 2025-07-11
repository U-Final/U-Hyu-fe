import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrandLogo, BRANDS } from '@shared/components/brand_grid';

const meta: Meta<typeof BrandLogo> = {
  title: 'Components/BrandLogo',
  component: BrandLogo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '개별 브랜드 로고를 표시하는 컴포넌트입니다. 클릭 시 선택/해제가 가능하며 애니메이션 효과가 포함되어 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    brand: {
      description: '브랜드 정보 객체',
      control: { type: 'object' },
    },
    isSelected: {
      description: '선택 여부',
      control: { type: 'boolean' },
    },
    onClick: {
      description: '클릭 시 호출되는 함수',
      action: 'clicked',
    },
    delay: {
      description: '애니메이션 지연 시간 (초)',
      control: { type: 'range', min: 0, max: 2, step: 0.1 },
    },
    disabled: {
      description: '비활성화 여부',
      control: { type: 'boolean' },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 (CGV)
export const Default: Story = {
  args: {
    brand: BRANDS[0], // CGV
    isSelected: false,
    onClick: () => console.log('brand-clicked'),
    delay: 0,
    disabled: false,
  },
};

// 선택된 상태
export const Selected: Story = {
  args: {
    brand: BRANDS[1], // 베스킨라빈스
    isSelected: true,
    onClick: () => console.log('brand-clicked'),
    delay: 0,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '선택된 상태의 브랜드 로고입니다. 파란색 테두리와 체크 아이콘이 표시됩니다.',
      },
    },
  },
};

// 비활성화된 상태
export const Disabled: Story = {
  args: {
    brand: BRANDS[2], // 파리바게뜨
    isSelected: false,
    onClick: () => console.log('brand-clicked'),
    delay: 0,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화된 상태의 브랜드 로고입니다. 투명도가 줄어들고 클릭할 수 없습니다.',
      },
    },
  },
};

// 선택된 상태 + 비활성화
export const SelectedDisabled: Story = {
  args: {
    brand: BRANDS[3], // GS25
    isSelected: true,
    onClick: () => console.log('brand-clicked'),
    delay: 0,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '선택된 상태이지만 비활성화된 브랜드 로고입니다.',
      },
    },
  },
};

// 애니메이션 지연 효과
export const WithDelay: Story = {
  args: {
    brand: BRANDS[4], // 롯데시네마
    isSelected: false,
    onClick: () => console.log('brand-clicked'),
    delay: 0.5,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '0.5초 지연 후 나타나는 애니메이션 효과가 적용된 브랜드 로고입니다.',
      },
    },
  },
};

// 클릭 불가능한 상태 (읽기 전용)
export const ReadOnly: Story = {
  args: {
    brand: BRANDS[5], // 굽네치킨
    isSelected: true,
    onClick: undefined, // 클릭 핸들러 없음
    delay: 0,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'onClick이 없어서 클릭할 수 없는 읽기 전용 상태의 브랜드 로고입니다.',
      },
    },
  },
};

// 모든 브랜드 미리보기
export const AllBrands: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        padding: '20px',
      }}
    >
      {BRANDS.map((brand, index) => (
        <BrandLogo
          key={brand.id}
          brand={brand}
          isSelected={index % 3 === 0} // 일부만 선택된 상태로 표시
          onClick={() => console.log(`${brand.name}-clicked`)}
          delay={index * 0.1}
          disabled={false}
        />
      ))}
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          '모든 브랜드 로고를 한 번에 볼 수 있는 미리보기입니다. 순차적인 애니메이션 효과도 확인할 수 있습니다.',
      },
    },
  },
};

// 이미지 로드 실패 테스트
export const ImageLoadError: Story = {
  args: {
    brand: {
      id: 'test',
      name: '테스트 브랜드',
      color: '#000000',
      bgColor: 'bg-black',
      textColor: 'text-white',
      imagePath: '/non-existent-image.png', // 존재하지 않는 이미지
    },
    isSelected: false,
    onClick: () => console.log('brand-clicked'),
    delay: 0,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '이미지 로드가 실패했을 때 텍스트 폴백이 표시되는 예시입니다.',
      },
    },
  },
};

// 긴 브랜드명 테스트
export const LongBrandName: Story = {
  args: {
    brand: {
      id: 'long-name',
      name: '매우 긴 브랜드 이름 테스트케이스',
      color: '#9333EA',
      bgColor: 'bg-purple-500',
      textColor: 'text-white',
      imagePath: '/images/brands/CGV.png',
    },
    isSelected: false,
    onClick: () => console.log('brand-clicked'),
    delay: 0,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '긴 브랜드명이 어떻게 표시되는지 확인하는 테스트 케이스입니다.',
      },
    },
  },
};

// 다양한 상태 비교
export const StateComparison: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '30px',
        padding: '20px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ marginBottom: '15px' }}>기본 상태</h4>
        <BrandLogo
          brand={BRANDS[0]}
          isSelected={false}
          onClick={() => console.log('default-clicked')}
          delay={0}
          disabled={false}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ marginBottom: '15px' }}>선택된 상태</h4>
        <BrandLogo
          brand={BRANDS[0]}
          isSelected={true}
          onClick={() => console.log('selected-clicked')}
          delay={0}
          disabled={false}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ marginBottom: '15px' }}>비활성화</h4>
        <BrandLogo
          brand={BRANDS[0]}
          isSelected={false}
          onClick={() => console.log('disabled-clicked')}
          delay={0}
          disabled={true}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ marginBottom: '15px' }}>선택됨 + 비활성화</h4>
        <BrandLogo
          brand={BRANDS[0]}
          isSelected={true}
          onClick={() => console.log('selected-disabled-clicked')}
          delay={0}
          disabled={true}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '브랜드 로고의 다양한 상태를 한 번에 비교해볼 수 있습니다.',
      },
    },
  },
};
