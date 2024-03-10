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
import { useModal } from "@/hooks/use-modal-store";

const ConfirmMailDialog = () => {
  const router = useRouter();
  const { isOpen, type, onClose, data } = useModal();
  const isDialogOpen = isOpen && type === "confirm-email";
  return (
    <AlertDialog open={isDialogOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-sky-600">
            Please Confirm Your Email Address
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <span className="hyphens-auto text-base text-slate-600 dark:text-slate-200">
              Thank you for signing up with us. To complete your registration,
              please confirm your email address by clicking the link provided in
              the email we&#39;ve sent you on{" "}
              <code className="bg-sky-600 text-sm text-primary-foreground">
                {data.registeredEmail}
              </code>
              .
            </span>
            <Separator />
            <q className="mt-4 text-sm font-medium">
              Note:
              <span className="font-normal italic">
                If you don&#39;t see the email in your inbox, please check your
                spam folder. Sometimes our emails mistakenly end up there.
              </span>
            </q>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => router.push("/dashboard")}>
            Done
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmMailDialog;
