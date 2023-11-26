import React from "react";
import { Modal } from "antd";
import { useModalContext } from "@/context/ModalContext";

const ModalDetail = ({ title, modalId, children }: any) => {
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

export default React.memo(ModalDetail);
