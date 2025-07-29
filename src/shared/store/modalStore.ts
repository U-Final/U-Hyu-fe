import { create } from 'zustand';

type ModalType = 'none' | 'base' | 'login';

interface ModalStore {
  modalType: ModalType;
  modalProps: {
    title?: React.ReactNode;
    children?: React.ReactNode;
  };
  onCloseCallback?: () => void;
  openModal: (
    type: ModalType,
    props?: {
      title?: React.ReactNode;
      children?: React.ReactNode;
    },
    onCloseCallback?: () => void
  ) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  modalType: 'none',
  modalProps: {},
  onCloseCallback: undefined,
  openModal: (type, props = {}, onCloseCallback) => {
    const currentState = get();
    // 이미 같은 타입의 모달이 열려있으면 무시
    if (currentState.modalType === type && currentState.modalType !== 'none') {
      return;
    }
    set({ modalType: type, modalProps: props, onCloseCallback });
  },
  closeModal: () => {
    const { onCloseCallback } = get();
    set({ modalType: 'none', modalProps: {}, onCloseCallback: undefined });
    onCloseCallback?.();
  },
}));
