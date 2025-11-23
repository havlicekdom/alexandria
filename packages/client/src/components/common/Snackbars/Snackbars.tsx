"use client";

import Snackbar from "components/common/Snackbar";
import { useSelector } from "react-redux";
import { selectMessage } from "store/shared/sharedSlice";

export function Snackbars() {
  const message = useSelector(selectMessage);

  return message && <Snackbar $variant={message.type}>{message.text}</Snackbar>;
}
