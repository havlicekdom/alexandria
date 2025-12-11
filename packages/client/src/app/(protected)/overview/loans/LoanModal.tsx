/* eslint-disable react/jsx-props-no-spreading */
"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import Modal from "components/common/Modal";
import yup from "utils/formValidation";
import Icon from "components/common/Icon";
import { Book } from "types/book";

import Button from "components/common/Button";
import { useActionState, useTransition } from "react";
import { createNewLoan } from "app/actions/loans";
import { User } from "types/user";
import { useLoanModal } from "./useLoanModal";

type Props = {
  user: User;
  loanableBooks: Book[];
};

type FormInputs = {
  userId: string;
  bookId: string;
};

const validationSchema = yup
  .object({
    userId: yup.string().required(),
    bookId: yup.string().required(),
  })
  .required();

function LoanModal({ user, loanableBooks }: Props) {
  const { loanModalOpen, closeLoanModal } = useLoanModal();
  const [_, startTransition] = useTransition();
  const [state, createAction] = useActionState(createNewLoan, undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema),
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

  const onSubmit: SubmitHandler<FormInputs> = async (_, e) => {
    startTransition(() => {
      createAction(new FormData(e?.target as HTMLFormElement));
    });
    closeLoanModal();
  };

  return (
    loanModalOpen && (
      <Modal close={closeLoanModal} title="Loan a book" size="small">
        <form
          action={createAction}
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
          {errors.bookId && (
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

export default LoanModal;
