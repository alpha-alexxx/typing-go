"use client";

import ProfileForm from "../forms/profile-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";

const UpdateProfileModal = () => {
  const {
    onClose,
    isOpen,
    type,
    data: { profile },
  } = useModal();
  const isModalOpen = isOpen && type === "update-profile";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Provide details about yourself and any other pertinent information.
          </DialogDescription>
        </DialogHeader>
        <ProfileForm profile={profile} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileModal;
