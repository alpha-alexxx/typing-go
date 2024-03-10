"use client";

import { useEffect, useState } from "react";

import {
  ConfirmDeleteAccountDialog,
  ConfirmEmailChange,
  ConfirmMailDialog,
  ConfirmPasswordChange,
  DeleteProfileImageDialog,
} from "@/components/dialog";

export const AlertProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ConfirmMailDialog />
      <DeleteProfileImageDialog />
      <ConfirmPasswordChange />
      <ConfirmEmailChange />
      <ConfirmDeleteAccountDialog />
    </>
  );
};
