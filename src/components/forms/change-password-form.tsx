"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "../ui/progress";
import { zodResolver } from "@hookform/resolvers/zod";
import { public_users } from "@prisma/client";
import axios from "axios";
import generator from "generate-password";
import { Eye, EyeOff, Key, KeyRound, Loader, Save } from "lucide-react";
import queryString from "query-string";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { useAlert } from "@/hooks/use-alert-store";
import passwordChecker from "@/lib/password-checker";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const changePasswordFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "Minimum length is 6 characters." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Minimum length is 6 characters." }),
  })
  .refine(
    ({ newPassword, confirmPassword }) => {
      if (newPassword !== confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Passwords do not match with new password",
      path: ["confirmPassword"],
    },
  );

const ChangePasswordForm = ({ user }: { user: public_users }) => {
  const [isHidden, setIsHidden] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const [strengthProgress, setStrengthProgress] = useState(0);
  const router = useRouter();
  const { onAlertOpen } = useAlert();
  const form = useForm<z.infer<typeof changePasswordFormSchema>>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const { hasLowerCase, hasNumber, hasSymbol, hasUpperCase, isSixCharsLong } =
    passwordChecker(form.watch("newPassword"));

  useEffect(() => {
    const strength =
      [hasUpperCase, hasLowerCase, hasNumber, hasSymbol, isSixCharsLong].filter(
        Boolean,
      ).length * 20;
    setStrengthProgress(strength);
  }, [hasLowerCase, hasNumber, hasSymbol, hasUpperCase, isSixCharsLong]);

  //@ts-ignore
  if (user?.provider && user?.provider?.provider !== "email") {
    return (
      <div className="text-center text-sky-600">
        You are using social account for login. You don&#39;t need to change
        password. <strong>{user?.email}</strong>
      </div>
    );
  }

  async function onSubmit(values: z.infer<typeof changePasswordFormSchema>) {
    const { newPassword, confirmPassword } = values;
    const url = queryString.stringifyUrl({
      url: "/api/profile/change-password",
      query: {
        userId: user?.id as string,
      },
    });
    try {
      if (newPassword !== confirmPassword) {
        throw Error("Password is not matching");
      }
      const response = await axios.put(url, {
        newPassword,
        confirmPassword,
      });
      toast.success(response.data.message);
      router.refresh();
    } catch (error: any) {
      console.log("[UPDATE_PASSWORD_ERROR]", error);
      toast.error(
        error?.response?.data?.error?.message || "Something went wrong!",
      );
    }
  }

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel
                  htmlFor="password"
                  className="block text-sm font-medium leading-6"
                >
                  New Password
                </FormLabel>

                <FormControl>
                  <>
                    <div className="peer relative mt-2 rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <KeyRound
                          className="h-5 w-5 text-sky-400"
                          aria-hidden="true"
                        />
                      </div>
                      <Input
                        id="password"
                        type={isHidden.newPassword ? "password" : "text"}
                        {...field}
                        autoComplete="true"
                        className="peer/password h-full w-full rounded-md bg-background bg-slate-50 py-2 pl-10 text-sm ring-2 ring-sky-500 placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:bg-slate-800 sm:leading-6"
                      />
                      <div
                        className={cn(
                          "group absolute inset-y-0 right-0 z-10 flex size-8 cursor-pointer items-center justify-center px-1.5 active:scale-95 ",
                        )}
                        onClick={() =>
                          setIsHidden((prevState) => ({
                            ...prevState,
                            newPassword: !prevState.newPassword,
                          }))
                        }
                      >
                        {isHidden.newPassword ? (
                          <Eye
                            className="h-5 w-5 text-slate-800 group-hover:text-sky-500"
                            aria-hidden="true"
                          />
                        ) : (
                          <EyeOff
                            className="h-5 w-5 text-slate-800 group-hover:text-sky-500"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </div>
                    <Progress
                      progressbarColor={
                        strengthProgress === 20 && !isSixCharsLong
                          ? "bg-rose-500"
                          : 80 >= strengthProgress && strengthProgress >= 20
                            ? "bg-orange-500"
                            : strengthProgress === 100 && isSixCharsLong
                              ? "bg-emerald-500"
                              : "bg-primary"
                      }
                      className="mt-2 h-2"
                      color="red"
                      value={strengthProgress}
                    />
                  </>
                </FormControl>
                <FormDescription>
                  Password must contain one capital letter, one small letter,
                  one number character , one symbol and it should be at least 6
                  character long.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel
                  htmlFor="password"
                  className="block text-sm font-medium leading-6"
                >
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <>
                    <div className="peer relative mt-2 rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <KeyRound
                          className="h-5 w-5 text-sky-400"
                          aria-hidden="true"
                        />
                      </div>
                      <Input
                        id="password"
                        type={isHidden.confirmPassword ? "password" : "text"}
                        {...field}
                        autoComplete="true"
                        className="peer/password h-full w-full rounded-md bg-background bg-slate-50 py-2 pl-10 text-sm ring-2 ring-sky-500 placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:bg-slate-800 sm:leading-6"
                      />
                      <div
                        className={cn(
                          "group absolute inset-y-0 right-0 z-10 flex size-8 cursor-pointer items-center justify-center px-1.5 active:scale-95 ",
                        )}
                        onClick={() =>
                          setIsHidden((prevState) => ({
                            ...prevState,
                            confirmPassword: !prevState.confirmPassword,
                          }))
                        }
                      >
                        {isHidden.confirmPassword ? (
                          <Eye
                            className="h-5 w-5 text-slate-800 group-hover:text-sky-500"
                            aria-hidden="true"
                          />
                        ) : (
                          <EyeOff
                            className="h-5 w-5 text-slate-800 group-hover:text-sky-500"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </div>
                  </>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-4 flex items-center justify-end gap-x-4 ">
          <Button
            type="button"
            variant={"outline"}
            className="text-xs outline-sky-600 "
            onClick={() => {
              const password = generator.generate({
                length: 14,
                uppercase: true,
                lowercase: true,
                numbers: true,
                symbols: true,
                strict: true,
                excludeSimilarCharacters: true,
              });
              form.setValue("newPassword", password);
              form.setValue("confirmPassword", password);
            }}
          >
            Generate strong password
          </Button>
          <Button
            className="w-full gap-x-2 md:w-44"
            type="button"
            onClick={() => {
              onAlertOpen(
                "change-password",
                { action: form.handleSubmit(onSubmit) },
                "alert-dialog",
              );
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="size-4 animate-spin" />
                Changing Password...
              </>
            ) : (
              <>
                <Key className="size-4" />
                Change Password
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
