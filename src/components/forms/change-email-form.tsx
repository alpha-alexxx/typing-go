"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomTooltip from "../custom/custom-tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import { public_users } from "@prisma/client";
import { User } from "@supabase/supabase-js";
import axios from "axios";
import { AlertCircle, Cross, Edit, Loader, Mail, Save, X } from "lucide-react";
import queryString from "query-string";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAlert } from "@/hooks/use-alert-store";
import useMounted from "@/hooks/use-mounted";
import { createClient } from "@/lib/supabase/client";

const changeEmailFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "📧 Email is required" })
    .email({ message: "🚫 Invalid email" })
    .refine(
      async (email: string) => {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", email);
        return !(data && data.length > 0);
      },
      {
        message:
          "This email is already registered with us. Please add another email.",
      },
    ),
});

const ChangeEmailForm = ({ user }: { user: public_users }) => {
  const { onAlertOpen } = useAlert();
  const router = useRouter();
  const [isEditable, setIsEditable] = useState(false);
  const form = useForm<z.infer<typeof changeEmailFormSchema>>({
    resolver: zodResolver(changeEmailFormSchema),
    defaultValues: {
      email: user?.email ?? "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  //@ts-ignore
  if (user?.provider && user?.provider?.provider !== "email") {
    return (
      <div className="text-center text-sky-600">
        You are using social account for login. You can&#39;t change your email
        through this page. <strong>{user?.email}</strong>
      </div>
    );
  }

  async function onSubmit(email: z.infer<typeof changeEmailFormSchema>) {
    const url = queryString.stringifyUrl({
      url: "/api/profile/update-email",
      query: {
        userId: user?.id as string,
      },
    });
    try {
      const response = await axios.put(url, {
        email: email?.email,
      });
      toast.success(response.data.message);
      setIsEditable(false);
      router.refresh();
    } catch (error) {
      console.log("[UPDATE_EMAIL_ERROR]", error);
      toast.error("Error! You got some errors in your fields");
    }
  }

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="mt-2 flex w-full flex-row items-center justify-center gap-x-2">
                  <div className="relative flex-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail
                        className="h-5 w-5 text-sky-400"
                        aria-hidden="true"
                      />
                    </div>
                    <Input
                      id="email"
                      autoComplete="email"
                      disabled={!isEditable}
                      {...field}
                      className=" h-full w-full rounded-md bg-background bg-slate-50 py-2 pl-10 text-sm ring-2 ring-sky-500 placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:bg-slate-800 sm:leading-6"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      {form.formState.errors.email?.message && (
                        <CustomTooltip
                          label={form.formState.errors.email?.message ?? ""}
                        >
                          <AlertCircle
                            className="h-5 w-5 text-rose-500"
                            aria-hidden="true"
                          />
                        </CustomTooltip>
                      )}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => {
                      setIsEditable((prev) => !prev);
                      form.clearErrors("email");
                    }}
                  >
                    {isEditable ? (
                      <X className="size-5" />
                    ) : (
                      <Edit className="size-5" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end ">
          <Button
            className="mt-4 w-full gap-x-2 md:w-44"
            type="button"
            onClick={() =>
              onAlertOpen("confirm-email-change", {
                action: form.handleSubmit(onSubmit),
                registeredEmail: user?.email as string,
                newEmail: form.getValues("email") as string,
              })
            }
            disabled={isLoading || !isEditable}
          >
            {isLoading ? (
              <>
                <Loader className="size-4 animate-spin" />
                Updating Email...
              </>
            ) : (
              <>
                <Save className="size-4" />
                Update Email
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangeEmailForm;
