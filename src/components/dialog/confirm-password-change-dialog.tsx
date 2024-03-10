"use client";

import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAlert } from "@/hooks/use-alert-store";

const ConfirmPasswordChange = () => {
  const router = useRouter();
  const {
    isAlertOpen,
    onAlertClose,
    alertType,
    alertData: { action },
  } = useAlert();
  const isDialogOpen = isAlertOpen && alertType === "change-password";
  return (
    <AlertDialog open={isDialogOpen} onOpenChange={onAlertClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-sky-600">
            Update Password
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <span className=" hyphens-auto text-base font-bold">
              Are you sure you want to change your profile password?
            </span>
            <span className="block font-medium italic text-gray-600 dark:text-gray-400">
              This action cannot be undone. Your current profile password will
              be changed in our system. Please confirm your decision
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

export default ConfirmPasswordChange;
