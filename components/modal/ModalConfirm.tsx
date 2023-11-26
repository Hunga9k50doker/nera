import React from "react";
import { Modal } from "antd";
import { useModalContext } from "@/context/ModalContext";

const ModalConfirm = ({
  title,
  modalId,
  callBack,
  children,
  confirmLoading,
}: any) => {
  const { hideModal, modalState } = useModalContext();
  return (
    <Modal
      centered
      title={title}
      confirmLoading={confirmLoading || false}
      open={modalState?.[modalId] || false}
      onCancel={() => hideModal(modalId)}
      onOk={callBack}
    >
      {children}
    </Modal>
  );
};

export default React.memo(ModalConfirm);
