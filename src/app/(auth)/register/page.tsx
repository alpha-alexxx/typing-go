import React from "react";
import { Metadata } from "next";
import Image from "next/image";

import Logo from "@/assets/original-logo.png";
import { RegisterForm } from "@/components/forms/register-form";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Register",
};

export default function Page() {
  return (
    <>
      <div className="flex min-h-full flex-1 items-center justify-center">
        <div className="flex w-1/3 flex-1 flex-col items-center justify-center px-2 lg:flex-none ">
          <div className="mx-auto w-full p-8">
            <div className="w-[90%]">
              <Image className="h-10 w-auto" src={Logo} alt="TypingGO Logo" />
              <h2 className="mt-4 text-3xl font-bold leading-9 tracking-tight text-slate-800 dark:text-slate-200">
                Create an account
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Sign up to enhance your typing skills in a conducive learning
                environment.
              </p>
            </div>

            <div className="mt-4">
              <div>
                <RegisterForm />
              </div>
            </div>
          </div>
        </div>

        <div className="relative hidden w-[950px] flex-1 lg:block">
          {/* <img
            className='absolute inset-0 h-full w-full object-cover'
            src='https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80'
            alt=''
          /> */}
          <Skeleton className=" h-screen w-full" />
        </div>
      </div>
    </>
  );
}
