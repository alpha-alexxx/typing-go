"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { buttonVariants } from "../ui/button";
import DesktopBar from "./DesktopBar";
import MobileBar from "./MobileBar";

import useScrollPosition from "@/hooks/use-scroll-position";
import { cn } from "@/lib/utils";

const Navbar = ({ className }: { className?: string }) => {
  const router = useRouter();
  const [urlHref, setUrlHref] = useState("");
  const { scrollPosition } = useScrollPosition("home" || urlHref);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrlHref(window.location.href.split("#")[1]);
    }
  }, []);
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[20] border-b  bg-slate-100/10 px-3 py-4 shadow backdrop-blur-[3px] dark:bg-slate-800/10 md:shadow-none lg:px-32",
        className,
      )}
    >
      <div className="m-auto flex w-full  max-w-screen-xl flex-row items-center justify-between">
        {/* Logo Section */}
        <div className="brand relative flex items-center justify-center">
          <div className="brand-logo flex items-center justify-center">
            <Image
              src={"/original-logo.png"}
              alt="TypingGo Logo"
              width={32}
              height={32}
              className="h-auto w-auto object-contain"
            />
          </div>

          <div className="brand-name  text-center text-xl font-bold">
            <span className="">Typing</span>
            <span className="text-xl italic underline decoration-primary decoration-double">
              Go
            </span>
          </div>
        </div>
        {/* Desktop Navbar */}
        <DesktopBar scrollPosition={scrollPosition} />
        <div className="group-btns flex flex-row items-center justify-between gap-x-4">
          <Link
            className={cn(
              buttonVariants({ size: "default", variant: "ghost" }),
            )}
            href={"/register"}
            scroll={false}
          >
            Register
          </Link>
          <Link
            className={cn(buttonVariants({ size: "default" }))}
            href={"/login"}
            scroll={false}
          >
            Login
          </Link>
        </div>
        <MobileBar scrollPosition={scrollPosition} />
      </div>
    </header>
  );
};

export default Navbar;
