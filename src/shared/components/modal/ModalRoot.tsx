import { useModalStore } from "@shared/store/modalStore";
import BaseModal from "./BaseModal";
import LoginModal from "./LoginModal";

const ModalRoot = () => {
  const modalType = useModalStore((state) => state.modalType);
  const modalProps = useModalStore((state) => state.modalProps);

  if (modalType === "none") return null;

  switch (modalType) {
    case "base":
      return <BaseModal title={modalProps.title}>{modalProps.children}</BaseModal>;
    case "login":
      return <LoginModal />;
    default:
      return null;
  }
};

export default ModalRoot;
