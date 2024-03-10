"use client";

import { useRouter } from "next/navigation";
import { buttonVariants } from "../ui/button";
import { CheckCircleIcon } from "lucide-react";

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
import { cn } from "@/lib/utils";

const ConfirmDeleteAccountDialog = () => {
  const router = useRouter();
  const {
    isAlertOpen,
    onAlertClose,
    alertType,
    alertData: { action },
  } = useAlert();
  const isDialogOpen = isAlertOpen && alertType === "delete-account";
  return (
    <AlertDialog open={isDialogOpen} onOpenChange={onAlertClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-rose-600">
            Confirm Account Deletion
          </AlertDialogTitle>
          <AlertDialogDescription className="ml-4 space-y-4">
            <span className="block text-base font-medium italic text-gray-600 dark:text-gray-400">
              Are you sure you want to delete your profile? This action is
              irreversible and will permanently remove all associated data. Take
              a moment to consider before proceeding...
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={cn(
              buttonVariants({ variant: "destructive" }),
              "gap-x-2 shadow-md",
            )}
            onClick={() => {
              action ? action() : null;
              onAlertClose();
            }}
          >
            <CheckCircleIcon className="size-4 hover:animate-ping" />
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDeleteAccountDialog;
