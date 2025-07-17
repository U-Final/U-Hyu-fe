import type { Meta, StoryObj } from '@storybook/react-vite';
import { createElement } from 'react';
import FilterTabs from '../FilterTabs';
import { FILTER_TABS } from '../FilterTabs.variants';

const meta: Meta<typeof FilterTabs> = {
  title: 'UI/FilterTabs',
  component: FilterTabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '카테고리 등을 필터링할 수 있는 가로 스크롤 탭 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    tabs: {
      control: false,
      description: '탭 항목 배열',
    },
    onChange: {
      action: 'changed',
      description: '탭이 선택될 때 호출되는 콜백 함수',
    },
    variant: {
      control: { type: 'select' },
      options: ['gray', 'white'],
      description: '탭 버튼 스타일',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FilterTabs>;

export const Default: Story = {
  args: {
    tabs: FILTER_TABS,
  },
  parameters: {
    docs: {
      description: {
        story: 'FilterTabs의 기본 스타일입니다.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => {
    return createElement(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          padding: '16px',
        },
      },
      createElement(
        'div',
        null,
        createElement('h4', { style: { marginBottom: '8px' } }, 'Gray Variant'),
        createElement(FilterTabs, {
          tabs: FILTER_TABS,
          variant: 'gray',
          onChange: val => console.log('gray variant 선택:', val),
        })
      ),
      createElement(
        'div',
        null,
        createElement(
          'h4',
          { style: { marginBottom: '8px' } },
          'White Variant'
        ),
        createElement(FilterTabs, {
          tabs: FILTER_TABS,
          variant: 'white',
          onChange: val => console.log('White variant 선택:', val),
        })
      )
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'FilterTabs의 `gray`, `white` variants 스타일을 모두 보여줍니다.',
      },
    },
  },
};

export const CustomTabs: Story = {
  args: {
    tabs: [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
      { label: 'C', value: 'c' },
    ],
    variant: 'gray',
  },
  parameters: {
    docs: {
      description: {
        story: '`tabs` prop으로 커스텀 탭을 전달할 수 있습니다.',
      },
    },
  },
};
