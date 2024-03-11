"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import generator from "generate-password";
import { AlertCircle, Eye, EyeOff, KeyRound, Loader, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { registerAction } from "@/app/(auth)/_actions/registerAction";
import GoogleIcon from "@/assets/google-svg";
import CustomTooltip from "@/components/custom/custom-tooltip";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { Progress } from "@/components/ui/progress";
import { registerFormSchema } from "@/constants/formSchema";
import { useAlert } from "@/hooks/use-alert-store";
import passwordChecker from "@/lib/password-checker";
import { clientSupabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function RegisterForm() {
  const { onAlertOpen } = useAlert();
  const router = useRouter();
  const [isHidden, setIsHidden] = useState(true);
  const [strengthProgress, setStrengthProgress] = useState(0);
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const { hasLowerCase, hasNumber, hasSymbol, hasUpperCase, isSixCharsLong } =
    passwordChecker(form.watch("password"));

  useEffect(() => {
    const strength =
      [hasUpperCase, hasLowerCase, hasNumber, hasSymbol, isSixCharsLong].filter(
        Boolean,
      ).length * 20;
    setStrengthProgress(strength);
  }, [hasLowerCase, hasNumber, hasSymbol, hasUpperCase, isSixCharsLong]);

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    const { email, password, rememberMe } = values;

    if (rememberMe) {
      typeof window !== "undefined" &&
        localStorage.setItem("login-email", email);
      typeof window !== "undefined" &&
        localStorage.setItem("login-password", password);
    } else {
      typeof window !== "undefined" && localStorage.removeItem("login-email");
      typeof window !== "undefined" &&
        localStorage.removeItem("login-password");
    }

    try {
      const { error } = await registerAction(values);
      if (error) {
        throw error;
      }
      toast.success("Registered Successfully!", {
        description:
          "Please check your email and click on the verification link",
      });
      form.reset();
      onAlertOpen(
        "confirm-email",
        { registeredEmail: values.email },
        "alert-dialog",
      );
    } catch (error) {
      console.log("[SIGN_UP_FORM_ERROR]", error);
      toast.error("Something went wrong!", {
        description: "Please check your credentials and try again.",
        duration: 5000,
      });
    }
  }
  async function handleGoogleAuth() {
    try {
      const { data, error } = await clientSupabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
      });
      if (error) {
        throw error;
      }
      router.replace("/dashboard");
    } catch (error) {
      console.log("[SIGN_UP_FORM_ERROR]", error);
      toast.error("Something Went Wrong!", {
        description: "Please check your credentials and try again.",
        duration: 5000,
      });
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md select-none space-y-4"
          action="#"
          method="POST"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="email"
                  className="block text-sm font-medium leading-6"
                >
                  Email address
                </FormLabel>
                <FormControl className="relative">
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail
                        className="h-5 w-5 text-sky-400"
                        aria-hidden="true"
                      />
                    </div>
                    <Input
                      id="email"
                      autoComplete="email"
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
                </FormControl>
                <FormDescription>
                  Please enter your email address to register. We will never
                  share your email with anyone.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="password"
                  className="block text-sm font-medium leading-6"
                >
                  Password
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
                        type={isHidden ? "password" : "text"}
                        {...field}
                        autoComplete="true"
                        className="peer/password h-full w-full rounded-md bg-background bg-slate-50 py-2 pl-10 text-sm ring-2 ring-sky-500 placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:bg-slate-800 sm:leading-6"
                      />
                      <div
                        className={cn(
                          "group absolute inset-y-0 right-0 z-10 flex size-8 cursor-pointer items-center justify-center px-1.5 active:scale-95 ",
                        )}
                        onClick={() => setIsHidden((prevState) => !prevState)}
                      >
                        {isHidden ? (
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
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="rememberMe"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 accent-sky-600 focus:ring-sky-600"
                          {...form.register("rememberMe")}
                        />
                        <label
                          htmlFor="rememberMe"
                          className={cn(
                            "ml-3 block cursor-pointer text-sm leading-6 text-gray-400",
                            {
                              "text-sky-600":
                                form.getValues("rememberMe") === true,
                            },
                          )}
                        >
                          Remember me
                        </label>
                      </div>
                      <Button
                        type="button"
                        variant={"outline"}
                        size={"sm"}
                        className="text-xs outline-sky-600"
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
                          setIsHidden(false);
                          form.setValue("password", password);
                        }}
                      >
                        Generate strong password
                      </Button>
                    </div>
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
          <div>
            <Button
              type="submit"
              className="flex w-full justify-center gap-x-2 rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              {isLoading && <Loader className="size-5 animate-spin" />}
              Register
            </Button>
          </div>
          <div className="mt-2 w-full  text-center">
            <span className="text-sm">
              Already have an account?{" "}
              <Link
                className="font-medium hover:text-sky-500"
                scroll={false}
                href={"/login"}
              >
                Login
              </Link>
            </span>
          </div>
          <div className="mt-6">
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-background px-6 text-gray-900 dark:text-slate-50">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 flex w-full items-center justify-center">
              <Button
                type="button"
                onClick={handleGoogleAuth}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "w-full gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500",
                )}
              >
                <GoogleIcon className="size-5" />
                <span className="text-sm font-semibold leading-6">
                  Register with Google
                </span>
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
