import { useRouter } from "next/navigation";
import CustomTooltip from "../custom/custom-tooltip";
import UploadAvatarField from "../custom/upload-avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { profiles } from "@prisma/client";
import axios from "axios";
import { AlertCircle, Award, Loader, SaveAll, User } from "lucide-react";
import queryString from "query-string";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateFormSchema } from "@/constants/formSchema";

interface ProfileFormProps {
  profile?: profiles;
}

const ProfileForm = ({ profile }: ProfileFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      username: profile?.username || "",
      full_name: profile?.full_name || "",
      avatar_url: profile?.avatar_url ?? null,
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof updateFormSchema>) {
    const { full_name, username, avatar_url } = values;
    const url = queryString.stringifyUrl({
      url: "/api/profile/update-profile",
      query: {
        userId: profile?.id as string,
      },
    });
    try {
      const response = await axios.put(url, {
        full_name,
        username,
        avatar_url,
      });
      toast.success("Update Profile Successfully!");

      router.refresh();
    } catch (error) {
      console.log("[UPDATE_PROFILE_ERROR]", error);
      toast.error("Error! You got some errors in your fields");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <UploadAvatarField
          user={profile}
          setValue={form.setValue}
          picUrl={form.getValues("avatar_url")}
        />
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Award
                        className="h-5 w-5 text-sky-400"
                        aria-hidden="true"
                      />
                    </div>
                    <Input
                      id="username"
                      autoComplete="username"
                      {...field}
                      className=" h-full w-full rounded-md bg-background bg-slate-50 py-2 pl-10 text-sm ring-2 ring-sky-500 placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:bg-slate-800 sm:leading-6"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      {form.formState.errors.username?.message && (
                        <CustomTooltip
                          label={form.formState.errors.username?.message ?? ""}
                        >
                          <AlertCircle
                            className="h-5 w-5 text-rose-500"
                            aria-hidden="true"
                          />
                        </CustomTooltip>
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Write a unique username for your profile. It will be used as
                  the public identifier of your rankings.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="full_name">Full name</FormLabel>
                <FormControl>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <User
                        className="h-5 w-5 text-sky-400"
                        aria-hidden="true"
                      />
                    </div>
                    <Input
                      id="full_name"
                      autoComplete="full_name"
                      {...field}
                      className=" h-full w-full rounded-md bg-background bg-slate-50 py-2 pl-10 text-sm ring-2 ring-sky-500 placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:bg-slate-800 sm:leading-6"
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Write your full name as it will appear in results and ranking
                  list.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter className="mt-4">
          <Button className="w-full gap-x-2 md:w-44" type="submit">
            {isLoading ? (
              <>
                <Loader className="size-4 animate-spin" />
                Saving Profile...
              </>
            ) : (
              <>
                <SaveAll className="size-4" />
                Save Profile
              </>
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ProfileForm;
