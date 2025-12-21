'use client';

import FloatingButton from "components/common/FloatingButton";
import { useLoanModal } from "./useLoanModal";
import Icon from "components/common/Icon";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export function LoanABook() {
  const { openLoanModal } = useLoanModal();

  return (
    <FloatingButton large onClick={openLoanModal}>
      <Icon icon={faPlusCircle} />
      Loan a book
    </FloatingButton>
  );
}
