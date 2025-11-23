"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react';

type InitialState = {
  isSuccessfullySubmitted: boolean;
  setIsSuccessfullySubmitted: Dispatch<SetStateAction<boolean>>;
};

const initialState: InitialState = {
  isSuccessfullySubmitted: false,
  setIsSuccessfullySubmitted: () => ({}),
};

const SubmitSuccessfulContext = createContext(initialState);

SubmitSuccessfulContext.displayName = 'SubmitSuccessfulContext';

function SubmitSuccessfulProvider({ children }: { children: ReactNode }) {
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);

  const submitSuccessfulContextValues = useMemo(() => ({
    isSuccessfullySubmitted,
    setIsSuccessfullySubmitted,
  }), [isSuccessfullySubmitted]);

  return (
    <SubmitSuccessfulContext.Provider value={submitSuccessfulContextValues}>
      { children }
    </SubmitSuccessfulContext.Provider>
  );
}

export { SubmitSuccessfulContext, SubmitSuccessfulProvider };
