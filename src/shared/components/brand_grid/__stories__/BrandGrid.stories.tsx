import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  BRANDS,
  BrandGrid,
  type BrandGridProps,
} from '@/shared/components/brand_grid';

const BrandGridWrapper = (args: BrandGridProps) => {
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);

  const handleBrandToggle = (brandId: number | string) => {
    const numericBrandId = typeof brandId === 'string' ? parseInt(brandId) : brandId;
    setSelectedBrands(prev => {
      const newSelection = prev.includes(numericBrandId)
        ? prev.filter(id => id !== numericBrandId)
        : [...prev, numericBrandId];

      return newSelection;
    });
  };

  return (
    <BrandGrid
      {...args}
      selectedBrands={selectedBrands}
      onBrandToggle={handleBrandToggle}
    />
  );
};

const meta: Meta<typeof BrandGrid> = {
  title: 'Components/BrandGrid',
  component: BrandGrid,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '브랜드를 선택할 수 있는 그리드 컴포넌트입니다. 각 브랜드는 로고와 함께 표시되며, 클릭하여 선택/해제할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    selectedBrands: {
      description: '선택된 브랜드 ID 배열',
      control: { type: 'object' },
    },
    onBrandToggle: {
      description: '브랜드 선택/해제 시 호출되는 함수',
      action: 'brandToggled',
    },
    title: {
      description: '그리드 상단에 표시될 제목',
      control: { type: 'text' },
    },
    disabled: {
      description: '모든 브랜드 선택을 비활성화',
      control: { type: 'boolean' },
    },
  },
  decorators: [
    Story => (
      <div style={{ padding: '20px', maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: BrandGridWrapper,
  args: {
    selectedBrands: [] as number[],
    title: '브랜드를 선택해주세요',
    disabled: false,
  },
};

export const WithSelectedBrands: Story = {
  render: BrandGridWrapper,
  args: {
    selectedBrands: [1, 2, 3],
    title: '최근 이용한 브랜드를 선택해주세요',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '일부 브랜드가 미리 선택된 상태의 예시입니다.',
      },
    },
  },
};

export const AllSelected: Story = {
  render: BrandGridWrapper,
  args: {
    selectedBrands: BRANDS.map(brand => brand.id),
    title: '관심있는 브랜드를 선택해주세요',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '모든 브랜드가 선택된 상태의 예시입니다.',
      },
    },
  },
};

export const Disabled: Story = {
  render: BrandGridWrapper,
  args: {
    selectedBrands: [1, 2],
    title: '선택이 완료되었습니다',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          '모든 브랜드 선택이 비활성화된 상태입니다. 호버 효과와 클릭이 동작하지 않습니다.',
      },
    },
  },
};

export const ReadOnly: Story = {
  args: {
    selectedBrands: [3, 4, 5],
    title: '선택된 브랜드 (읽기 전용)',
    onBrandToggle: undefined,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'onBrandToggle이 없어서 클릭해도 선택 상태가 변경되지 않는 읽기 전용 상태입니다.',
      },
    },
  },
};

export const LongTitle: Story = {
  render: BrandGridWrapper,
  args: {
    selectedBrands: [],
    title:
      '귀하의 라이프스타일과 취향에 맞는 브랜드를 모두 선택해주세요. 선택한 브랜드를 바탕으로 맞춤형 혜택을 제공해드립니다.',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '긴 제목이 어떻게 표시되는지 확인하는 테스트 케이스입니다.',
      },
    },
  },
};

export const WithoutTitle: Story = {
  render: BrandGridWrapper,
  args: {
    selectedBrands: [1],
    title: '',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '제목이 없는 경우의 예시입니다.',
      },
    },
  },
};

export const WideLayout: Story = {
  render: BrandGridWrapper,
  args: {
    selectedBrands: [6, 7],
    title: '와이드 레이아웃에서의 브랜드 그리드',
    disabled: false,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          '넓은 화면에서 브랜드 그리드가 어떻게 표시되는지 확인할 수 있습니다.',
      },
    },
  },
  decorators: [
    Story => (
      <div
        style={{
          padding: '40px',
          width: '100vw',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Story />
        </div>
      </div>
    ),
  ],
};

export const AnimationDemo: Story = {
  render: args => {
    const [key, setKey] = useState(0);

    const resetAnimation = () => {
      setKey(prev => prev + 1);
    };

    return (
      <div>
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={resetAnimation}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            애니메이션 다시 보기
          </button>
        </div>
        <div key={key}>
          <BrandGridWrapper {...args} />
        </div>
      </div>
    );
  },
  args: {
    selectedBrands: [],
    title: '애니메이션 효과를 확인해보세요',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          '브랜드 로고가 순차적으로 나타나는 애니메이션 효과를 확인할 수 있습니다. "애니메이션 다시 보기" 버튼을 클릭하여 다시 볼 수 있습니다.',
      },
    },
  },
};
