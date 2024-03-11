"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Eye, EyeOff, KeyRound, Loader, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import loginAction from "@/app/(auth)/_actions/loginAction";
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
import { loginFormSchema } from "@/constants/formSchema";
import { clientSupabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const router = useRouter();
  const [isHidden, setIsHidden] = useState(true);
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email:
        typeof window !== "undefined"
          ? localStorage.getItem("login-email") || ""
          : "",
      password:
        typeof window !== "undefined"
          ? localStorage.getItem("login-password") || ""
          : "",
      rememberMe: true,
    },
  });
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log(values);
    if (values.rememberMe) {
      typeof window !== "undefined" &&
        localStorage.setItem("login-email", values.email);
      typeof window !== "undefined" &&
        localStorage.setItem("login-password", values.password);
    } else {
      typeof window !== "undefined" && localStorage.removeItem("login-email");
      typeof window !== "undefined" &&
        localStorage.removeItem("login-password");
    }
    try {
      const { data, error } = await loginAction(values);
      if (error) {
        throw error;
      }
      toast.success("Logged in Successfully!", {
        description: "You have logged in successfully.",
      });
      form.reset();
      router.push("/dashboard");
    } catch (error) {
      console.error("[SIGN_IN_FORM_ERROR] Unexpected error:", error);
      //@ts-ignore
      toast.info(error?.name, {
        //@ts-ignore
        description: error?.message,
        duration: 5000,
      });
      //@ts-ignore
      if (error?.message === "Invalid login credentials") {
        //@ts-ignore
        form.setError("password", { message: error?.message });
        //@ts-ignore
      } else if (error?.message === "Email not confirmed") {
        //@ts-ignore
        form.setError("email", { message: error?.message });
      }
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
      console.log("[SIGN_IN_FORM_ERROR]", error);
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
          className="w-full max-w-md space-y-4"
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
                  <div className="relative mt-2 rounded-md shadow-sm">
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
                      autoComplete={"true"}
                      className=" h-full w-full rounded-md bg-background bg-slate-50 py-2 pl-10 text-sm ring-2 ring-sky-500 placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:bg-slate-800 sm:leading-6"
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex select-none items-center justify-between ">
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 accent-sky-600 focus:ring-sky-600"
                {...form.register("rememberMe")}
              />
              <label
                htmlFor="rememberMe"
                className=" ml-3 block cursor-pointer text-sm leading-6 text-gray-400"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm leading-6">
              <Link
                href="#"
                className="font-semibold text-sky-600 hover:text-sky-500"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="flex w-full justify-center gap-x-2 rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              {isLoading && <Loader className="size-5 animate-spin" />}
              Login
            </Button>
          </div>
          <div className="mt-2 w-full  text-center">
            <span className="text-sm">
              Not have an account?{" "}
              <Link
                href={"/register"}
                scroll={false}
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "font-medium hover:text-sky-500",
                )}
              >
                Register
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
                onClick={handleGoogleAuth}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "w-full gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500",
                )}
                type="button"
              >
                <GoogleIcon className="size-5" />
                <span className="text-sm font-semibold leading-6">
                  Login with Google
                </span>
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
