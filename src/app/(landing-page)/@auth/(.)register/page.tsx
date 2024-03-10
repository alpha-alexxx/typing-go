import React from "react";

import { RegisterForm } from "@/components/forms/register-form";
import RouteModal from "@/components/modals/route-modal";

const AuthRegisterModal = () => {
  return (
    <RouteModal
      title="Register"
      description="Register to enhance your typing skills in a conducive learning environment."
    >
      <RegisterForm />
    </RouteModal>
  );
};

export default AuthRegisterModal;
