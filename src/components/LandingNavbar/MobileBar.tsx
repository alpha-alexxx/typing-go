"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { NAV_ITEMS } from "./data";
import { Menu, X } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const MobileBar = ({ scrollPosition }: { scrollPosition: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "md:hidden",
          )}
        >
          <Menu className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side={"top"}>
          <nav className="mt-8 h-full w-full">
            <ul className="flex w-full flex-col items-center justify-center gap-2">
              {NAV_ITEMS.map((item, index) => (
                <li
                  key={item.name}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "group flex h-10 w-full items-center justify-center rounded text-base font-medium hover:bg-primary hover:text-white",
                    {
                      "bg-primary text-white dark:text-black":
                        `#${scrollPosition}` === item.href,
                    },
                  )}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex h-full w-full items-center justify-center group-hover:text-white",
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileBar;
