import React from "react";
import { Modal } from "antd";
import { useModalContext } from "@/context/ModalContext";

const ModalConfirm = ({
  title,
  modalId,
  children,
  type = "primary",
  callBack,
  okText,
  confirmLoading,
}) => {
  const { hideModal, modalState } = useModalContext();
  return (
    <Modal
      centered
      title={title}
      confirmLoading={confirmLoading}
      open={modalState?.[modalId] || false}
      onCancel={() => hideModal(modalId)}
      okText={okText}
      onOk={callBack}
    >
      {children}
    </Modal>
  );
};

export default React.memo(ModalConfirm);
