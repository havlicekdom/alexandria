"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type LoanModalContextType = {
  loanModalOpen: boolean;
  openLoanModal: () => void;
  closeLoanModal: () => void;
};

const LoanModalContext = createContext<LoanModalContextType | undefined>(undefined);

export function LoanModalProvider({ children }: { children: ReactNode }) {
  const [loanModalOpen, setLoanModalOpen] = useState(false);

  const openLoanModal = () => setLoanModalOpen(true);
  const closeLoanModal = () => setLoanModalOpen(false);

  return (
    <LoanModalContext.Provider value={{ loanModalOpen, openLoanModal, closeLoanModal }}>
      {children}
    </LoanModalContext.Provider>
  );
}

export function useLoanModal() {
  const ctx = useContext(LoanModalContext);

  if (ctx) return ctx;

  throw new Error("useLoanModal must be used within a LoanModalProvider");
}

export default useLoanModal;
