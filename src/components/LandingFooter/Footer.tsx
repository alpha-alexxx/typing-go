import React from "react";
import Link from "next/link";

import { WEBSITE_NAME } from "@/constants/website_details";
import { cn } from "@/lib/utils";

const Footer = ({ className }: { className?: string }) => {
  return (
    <footer
      className={cn(
        " bottom-0 z-50 flex h-16 w-full flex-col items-center gap-2 border-t  px-4 py-6 sm:flex-row md:px-6",
        className,
      )}
    >
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} {WEBSITE_NAME}. All rights reserved.
      </p>
      <nav className="flex gap-4 sm:ml-auto sm:gap-6">
        <Link className="text-xs underline-offset-4 hover:underline" href="#">
          Terms of Service
        </Link>
        <Link className="text-xs underline-offset-4 hover:underline" href="#">
          Privacy
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
