"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { UseThemeProps } from "next-themes/dist/types";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ModeToggleProps {
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
  variant?: "ghost" | "outline";
  btnClassName?: string;
  sideOffset?: number;
}
export function ModeToggle({
  className,
  btnClassName,
  side,
  variant = "outline",
  sideOffset = 10,
}: ModeToggleProps) {
  const [isMounted, setIsMounted] = React.useState(false);
  const { theme, setTheme }: UseThemeProps = useTheme();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn(className)}>
        <div
          className={cn(
            buttonVariants({ variant: variant, size: "icon" }),
            "h-10 w-10 rounded-full",
            btnClassName,
          )}
        >
          {theme === "light" ? (
            <Sun className="h-6 w-6" />
          ) : theme === "dark" ? (
            <Moon className="h-6 w-6" />
          ) : (
            theme === "system" && <Laptop className="h-6 w-6" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn("w-56", side === "left" && "mb-8")}
        side={side}
        sideOffset={sideOffset}
      >
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={theme === "light"}
          onCheckedChange={() => setTheme("light")}
          className="gap-x-2"
        >
          <Sun /> Light
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === "dark"}
          onCheckedChange={() => setTheme("dark")}
          className="gap-x-2"
        >
          <Moon /> Dark
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === "system"}
          onCheckedChange={() => setTheme("system")}
          className="gap-x-2"
        >
          <Laptop /> System
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
