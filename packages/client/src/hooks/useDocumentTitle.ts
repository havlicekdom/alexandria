import { useRef, useEffect } from 'react';

function useDocumentTitle(title: string) {
  const defaultTitle = useRef(document.title);
  const titleSuffix = process.env.REACT_APP_APP_NAME;

  useEffect(() => {
    document.title = `${title} | ${titleSuffix}`;
  }, [title]);
}

export default useDocumentTitle;
