"use client";

import Spinner from "components/shell/Spinner/Spinner";
import { useSelector } from "react-redux";
import { selectIsLoading } from "store/shared/sharedSlice";

export default function Loading() {
  const isLoading = useSelector(selectIsLoading);

  return isLoading && <Spinner />;
}
