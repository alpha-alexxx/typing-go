"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAlert } from "@/hooks/use-alert-store";

const ConfirmEmailChange = () => {
  const router = useRouter();
  const {
    isAlertOpen,
    onAlertClose,
    alertType,
    alertData: { action, registeredEmail, newEmail },
  } = useAlert();
  const isDialogOpen = isAlertOpen && alertType === "confirm-email-change";
  return (
    <AlertDialog open={isDialogOpen} onOpenChange={onAlertClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-sky-600">
            Update Email
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <span className=" hyphens-auto text-base font-bold">
              Are you sure you want to change your profile email?
            </span>
            <span className="flex justify-center gap-x-3 text-sm ">
              <span className="bg-primary text-primary-foreground line-through">
                {registeredEmail}
              </span>
              <ArrowRight className="size-5" />
              <span className="text-sky-600">{newEmail}</span>
            </span>
            <span className="block font-medium italic text-gray-600 dark:text-gray-400">
              Your current profile email will be changed in our system. Please
              confirm your decision
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              action ? action() : null;
              onAlertClose();
            }}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmEmailChange;
