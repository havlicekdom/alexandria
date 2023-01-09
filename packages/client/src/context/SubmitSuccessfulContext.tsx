import React, { useMemo, useState } from 'react';

type InitialState = {
  isSuccessfullySubmitted: boolean;
  setIsSuccessfullySubmitted: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialState: InitialState = {
  isSuccessfullySubmitted: false,
  setIsSuccessfullySubmitted: () => ({}),
};

const SubmitSuccessfulContext = React.createContext(initialState);

SubmitSuccessfulContext.displayName = 'SubmitSuccessfulContext';

function SubmitSuccessfulProvider({ children }: { children: React.ReactNode }) {
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
