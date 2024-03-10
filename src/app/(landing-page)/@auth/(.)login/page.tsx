import React from "react";

import { LoginForm } from "@/components/forms/login-form";
import RouteModal from "@/components/modals/route-modal";

const AuthLoginModal = () => {
  return (
    <RouteModal
      title="Login"
      description="Enhance your typing skills in a conducive learning environment."
    >
      <LoginForm />
    </RouteModal>
  );
};

export default AuthLoginModal;
