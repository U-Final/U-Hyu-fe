import { create } from "zustand";

type ModalType = "none" | "base" | "login";

interface ModalStore {
  modalType: ModalType;
  modalProps: {
    title?: React.ReactNode;
    children?: React.ReactNode;
  };
  openModal: (
    type: ModalType,
    props?: {
      title?: React.ReactNode;
      children?: React.ReactNode;
    }
  ) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modalType: "none",
  modalProps: {},
  openModal: (type, props = {}) => set({ modalType: type, modalProps: props }),
  closeModal: () => set({ modalType: "none", modalProps: {} }),
}));
