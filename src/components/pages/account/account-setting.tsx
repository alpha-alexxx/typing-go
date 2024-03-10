"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { profiles, public_users } from "@prisma/client";
import axios from "axios";
import { Loader, UserRoundX } from "lucide-react";
import queryString from "query-string";
import { toast } from "sonner";

import ChangeEmailForm from "@/components/forms/change-email-form";
import ChangePasswordForm from "@/components/forms/change-password-form";
import ProfileForm from "@/components/forms/profile-form";
import { Button } from "@/components/ui/button";
import { useAlert } from "@/hooks/use-alert-store";
import { createClient } from "@/lib/supabase/client";

type profileProps = profiles & {
  users: public_users;
};

const AccountSetting = ({ profile }: { profile: profileProps }) => {
  const { onAlertOpen } = useAlert();
  const router = useRouter();
  const [deleting, isDeleting] = useState(false);

  async function deleteMyAccount(userId: string) {
    try {
      isDeleting(true);
      const url = queryString.stringifyUrl({
        url: "/api/profile/delete-account",
        query: { userId },
      });
      await axios.delete(url);
      toast.success("Account deleted successfully.");
      router.refresh();
      router.push("/");
    } catch (error: any) {
      console.log("[DELETING_ACCOUNT_ERROR]", error);
      toast.error(error.response.data.error?.message || "Something went wrong");
    } finally {
      isDeleting(false);
    }
  }

  return (
    <div className="divide-y divide-white/5">
      <div className="flex max-w-7xl flex-col items-start justify-evenly gap-8 px-4 py-16 sm:px-6 md:flex-row lg:px-8">
        <div className="w-full md:w-80">
          <h2 className="text-base font-semibold leading-7 ">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            Use a permanent address where you can receive mail.
          </p>
        </div>
        <div className="w-full flex-1 ">
          <ProfileForm profile={profile} />
        </div>
      </div>
      <div className="flex max-w-7xl flex-col items-start justify-evenly gap-8 px-4 py-16 sm:px-6 md:flex-row lg:px-8">
        <div className="w-full md:w-80">
          <h2 className="text-base font-semibold leading-7 ">
            Change Email Address
          </h2>
          <p className="mt-1 break-words text-sm leading-6 text-gray-400">
            Easily change the email associated with your account, the one you
            use to log in. Keep your information up to date hassle-free.
          </p>
        </div>
        <div className="w-full flex-1 ">
          <ChangeEmailForm user={profile?.users} />
        </div>
      </div>
      <div className="flex max-w-7xl flex-col items-start justify-evenly gap-8 px-4 py-16 sm:px-6 md:flex-row lg:px-8">
        <div className="w-full md:w-80">
          <h2 className="text-base font-semibold leading-7 ">
            Change password
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            Update your password associated with your account.
          </p>
        </div>

        <div className="w-full flex-1">
          <ChangePasswordForm user={profile?.users} />
        </div>
      </div>

      <div className="flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-16 sm:px-6 md:flex-row lg:px-8">
        <div className="w-full md:w-80">
          <h2 className="text-base font-semibold leading-7 ">Delete account</h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            No longer want to use our service? You can delete your account here.
            This action is not reversible. All information related to this
            account will be deleted permanently.
          </p>
        </div>
        <div className="w-full flex-1">
          <Button
            className="gap-x-2"
            variant={"destructive"}
            type="button"
            disabled={deleting}
            onClick={() => {
              onAlertOpen("delete-account", {
                action: () => deleteMyAccount(profile?.id),
              });
            }}
          >
            {deleting ? (
              <>
                <Loader className="size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <UserRoundX className="size-4" />
                Yes, delete my account
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
