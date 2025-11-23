import { useEffect } from 'react';

function useDocumentTitle(title: string) {
  const titleSuffix = process.env.NEXT_PUBLIC_APP_NAME;

  useEffect(() => {
    document.title = `${title} | ${titleSuffix}`;
  }, [title]);
}

export default useDocumentTitle;
