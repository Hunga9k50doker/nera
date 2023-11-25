"use client";
import React, { createContext, useState, useContext } from "react";

interface ModalContextData {
  modalState: any;
  showModal: (id: string) => void;
  hideModal: (id: string) => void;
}

const ModalContext = createContext<ModalContextData>({
  modalState: {},
  showModal: () => {},
  hideModal: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalState, setModalState] = useState<any>({});

  const showModal = (modalId: string) => {
    setModalState((pre: any) => ({ ...pre, [modalId]: true }));
  };

  const hideModal = (modalId: string) => {
    setModalState((pre: any) => ({ ...pre, [modalId]: false }));
  };

  const contextValue: ModalContextData = {
    showModal,
    hideModal,
    modalState,
  };
  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = (): ModalContextData => {
  const context = useContext(ModalContext);
  if (!context) {
    console.log("error");
    throw new Error("useModalContext must be used within a ModalProvider");
  }

  return context;
};

export default ModalContext;
