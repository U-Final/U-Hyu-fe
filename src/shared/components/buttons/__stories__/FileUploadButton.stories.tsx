import type { Meta, StoryObj } from '@storybook/react-vite';

import { FileUploadButton } from '../FileUploadButton';

const meta: Meta<typeof FileUploadButton> = {
  title: 'Buttons/FileUploadButton',
  component: FileUploadButton,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileUploadButton>;

export const Default: Story = {
  args: {
    children: '파일 업로드',
    onFileSelect: () => {
      // 파일 선택 처리
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<FileUploadButton onFileSelect={handleFile}>파일 업로드</FileUploadButton>`,
      },
    },
  },
};
