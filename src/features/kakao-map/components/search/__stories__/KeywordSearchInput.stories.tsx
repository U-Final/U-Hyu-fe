import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  CompactKeywordSearchInput,
  KeywordSearchInput,
} from '../KeywordSearchInput';

const meta: Meta<typeof KeywordSearchInput> = {
  title: 'Features/KakaoMap/Search/KeywordSearchInput',
  component: KeywordSearchInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '카카오 키워드 검색을 위한 입력 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: '현재 검색어',
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태',
    },
    placeholder: {
      control: 'text',
      description: 'placeholder 텍스트',
    },
    autoFocus: {
      control: 'boolean',
      description: '자동 포커스 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof KeywordSearchInput>;

export const Default: Story = {
  args: {
    value: '',
    onChange: (value) => console.log('onChange:', value),
    onSearch: (value) => console.log('onSearch:', value),
    onCancel: () => console.log('onCancel'),
    loading: false,
    placeholder: '장소, 업체명 검색',
    autoFocus: false,
  },
};

export const WithValue: Story = {
  args: {
    ...Default.args,
    value: '강남역 카페',
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    value: '강남역 카페',
    loading: true,
  },
};

export const CustomPlaceholder: Story = {
  args: {
    ...Default.args,
    placeholder: '맛집을 검색해보세요',
  },
};

export const AutoFocus: Story = {
  args: {
    ...Default.args,
    autoFocus: true,
  },
};

// 컴팩트 버전 스토리
const compactMeta: Meta<typeof CompactKeywordSearchInput> = {
  title: 'Features/KakaoMap/Search/CompactKeywordSearchInput',
  component: CompactKeywordSearchInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '모바일이나 좁은 공간에서 사용하는 컴팩트한 키워드 검색 입력 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: '현재 검색어',
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태',
    },
    placeholder: {
      control: 'text',
      description: 'placeholder 텍스트',
    },
  },
};

export const CompactDefault: StoryObj<typeof CompactKeywordSearchInput> = {
  ...compactMeta,
  args: {
    value: '',
    onChange: (value) => console.log('onChange:', value),
    onSearch: (value) => console.log('onSearch:', value),
    onCancel: () => console.log('onCancel'),
    loading: false,
    placeholder: '장소 검색',
    autoFocus: false,
  },
};

export const CompactWithValue: StoryObj<typeof CompactKeywordSearchInput> = {
  ...compactMeta,
  args: {
    ...CompactDefault.args,
    value: '카페',
  },
};

export const CompactLoading: StoryObj<typeof CompactKeywordSearchInput> = {
  ...compactMeta,
  args: {
    ...CompactDefault.args,
    value: '카페',
    loading: true,
  },
};