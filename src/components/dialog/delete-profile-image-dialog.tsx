import { buttonVariants } from "../ui/button";
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
import { cn } from "@/lib/utils";

const DeleteProfileImageDialog = () => {
  const { isAlertOpen, alertType, onAlertClose, alertData } = useAlert();

  const { action } = alertData;
  const isDialogOpen = isAlertOpen && alertType === "delete-profile-image";

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={onAlertClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-rose-500">
            Delete Profile Image
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <span className="hyphens-auto text-base font-bold text-sky-600 dark:text-sky-400">
              Are you sure you want to delete your profile image?
            </span>
            <span className="block font-medium italic text-gray-600 dark:text-gray-400">
              This action cannot be undone. Your current profile image will be
              permanently removed from our system. Please confirm your decision
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={cn(buttonVariants({ variant: "destructive" }))}
            onClick={action}
          >
            Yes, I am sure
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProfileImageDialog;
