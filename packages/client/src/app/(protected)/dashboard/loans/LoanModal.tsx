"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import Modal from "components/common/Modal";
import Icon from "components/common/Icon";
import { Book } from "types/book";

import Button from "components/common/Button";
import { useActionState, useEffect, useTransition } from "react";
import { createNewLoan } from "app/actions/loans";
import { User } from "types/user";
import { useLoanModal } from "./useLoanModal";
import { initialState } from "constants/formDefaultState";
import { ApiCallActionStateWithValidation } from "types/api";
import { loanModalSchema } from "lib/schemas";
import { InferType } from "yup";

type Props = {
  user: User;
  loanableBooks: Book[];
};


type FormInputs = InferType<typeof loanModalSchema>;

export default function LoanModal({ user, loanableBooks }: Props) {
  const { loanModalOpen, closeLoanModal } = useLoanModal();
  const [isTransitioning, startTransition] = useTransition();
  const [state, formAction, isPending] = useActionState<ApiCallActionStateWithValidation, FormData>(createNewLoan, initialState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    // resolver: yupResolver(loanModalSchema),
  });

  const filterBooks = (books: Book[], inputValue: string) =>
    books
      .filter((book) =>
        book.name.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((book) => ({
        value: book.id,
        label: book.name,
      }));

  const onSubmit: SubmitHandler<FormInputs> = (_, e) => {
    startTransition(() => {
      formAction(new FormData(e?.target as HTMLFormElement));
    });
  };

  useEffect(() => {
    if (!state.fieldErrors && !state.apiError) {
      closeLoanModal();
    }
  }, [state, closeLoanModal]);

  return (
    loanModalOpen && (
      <Modal close={closeLoanModal} title="Loan a book" size="small">
        <form
          action={formAction}
          className="flex flex-col flex-auto h-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            data-testid="loan-modal-userId"
            type="hidden"
            value={user.id}
            {...register("userId")}
          />
          <select {...register("bookId")} className="mb-4 p-2 border border-gray-300 rounded" data-testid="loan-modal-bookId">
            <option value="">Select a book</option>
            {loanableBooks.map((book) => (
              <option key={book.id} value={book.id}>
                {book.name}
              </option>
            ))}
          </select>
          {(errors.bookId || state.fieldErrors?.bookId) && (
            <span className="inline-block mt-4 text-error">
              You need to select a book first.
            </span>
          )}
          <div className="mt-auto">
            <Button
              data-testid="loan-modal-submit"
              variant="primary"
              type="submit"
              name="submit"
              full
              isLoading={isPending}
            >
              <Icon icon={faPlusCircle} />
              Loan
            </Button>
          </div>
        </form>
      </Modal>
    )
  );
}
