import React from "react";
import { Modal } from "antd";
import { useModalContext } from "@/context/ModalContext";

const ModalInfo = ({ title, modalId, children }) => {
  const { hideModal, modalState } = useModalContext();
  return (
    <Modal
      centered
      title={title}
      open={modalState?.[modalId] || false}
      onCancel={() => hideModal(modalId)}
      footer={<></>}
    >
      {children}
    </Modal>
  );
};

export default React.memo(ModalInfo);
