import { createElement, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import SearchInput from '../SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'UI/SearchInput',
  component: SearchInput,
  parameters: {
    docs: {
      description: {
        component: '검색창 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'text' },
      description: '입력 필드의 현재 값',
    },
    onChange: {
      action: 'changed',
      description: '입력값이 변경될 때 호출되는 콜백',
    },
    onSearch: {
      action: 'searched',
      description: 'Enter 키 입력 시 호출되는 콜백',
    },
    onCancel: {
      action: 'cancelled',
      description: 'X 버튼 클릭 시 호출되는 콜백',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'placeholder 텍스트',
    },
    variant: {
      control: { type: 'select' },
      options: ['gray', 'white'],
      description: '검색창 스타일 타입',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    value: '',
    onChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: '검색창의 기본 스타일입니다.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return createElement(
      'div',
      {
        style: {
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          flexDirection: 'column',
        },
      },
      createElement(SearchInput, {
        value,
        onChange: setValue,
        placeholder: '브랜드 검색',
        variant: 'gray',
      }),
      createElement(SearchInput, {
        value,
        onChange: setValue,
        placeholder: '브랜드 검색',
        variant: 'white',
      })
    );
  },
  parameters: {
    docs: {
      description: {
        story: '검색창의 `gray`, `white` variants 스타일을 모두 보여줍니다.',
      },
    },
  },
};

export const Cancel: Story = {
  args: {
    value: 'GS25',
    onChange: () => {
    },
    onCancel: () => {
    },
    placeholder: '브랜드 검색',
    variant: 'gray',
  },
  parameters: {
    docs: {
      description: {
        story: '입력창에 값을 입력하면 X버튼이 생성됩니다.',
      },
    },
  },
};
