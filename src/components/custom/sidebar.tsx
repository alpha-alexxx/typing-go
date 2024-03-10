"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import CustomTooltip from "./custom-tooltip";
import { HoverEffect } from "./hover-effect";
import { ModeToggle } from "./ModeToggle";
import SettingDropDown from "./setting-dropdown";
import UserAvatar from "./user-avatar";
import { profiles } from "@prisma/client";
import {
  BarChart3,
  BrainCircuit,
  HomeIcon,
  Keyboard,
  Monitor,
  Swords,
} from "lucide-react";

import Logo from "@/assets/original-logo.png";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Practice Session", href: "/practice", icon: BrainCircuit },
  { name: "Mock Typing Test", href: "/typing-test", icon: Monitor },
  { name: "Free Style Typing", href: "/freestyle", icon: Keyboard },
  { name: "Typing Games", href: "/games", icon: Swords },
  { name: "Performance", href: "/performance", icon: BarChart3 },
];

const Sidebar = ({ user }: { user: profiles }) => {
  const supabase = createClient();
  const { onOpen } = useModal();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (user?.full_name === null || user?.username === null) {
      onOpen("update-profile", {
        profile: user,
      });
    }
  }, [user, onOpen]);

  return (
    <div className="fixed inset-y-0 flex min-h-screen grow flex-col gap-y-5 overflow-y-auto border-r-2 border-primary/10 bg-secondary/50 px-6 backdrop-blur-md">
      <div className="mt-2 flex h-16 shrink-0 items-center">
        <Image
          className="size-8 object-contain"
          src={Logo}
          width={32}
          height={32}
          alt="TypingGo"
        />
        <span className="sr-only text-2xl font-bold">TypingGo</span>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              <HoverEffect items={navigation} activePath={pathname} />
            </ul>
          </li>
          <div className="-mx-6 mt-auto ">
            <Separator className="mx-auto mt-auto h-0.5" />
            <li
              className={cn("flex items-center justify-between pr-4", {
                "bg-primary/10 backdrop-blur-sm": pathname.includes("/account"),
              })}
            >
              <div
                className={cn(
                  "flex items-center gap-x-4 px-1 py-3 text-sm font-semibold leading-6   transition duration-100",
                )}
              >
                <UserAvatar src={user?.avatar_url} name={user?.full_name} />
                <span className="sr-only">Your profile</span>
                <span className="capitalize" aria-hidden="true">
                  {user?.full_name}
                </span>
              </div>
              <div className="flex flex-row gap-x-2">
                <CustomTooltip label="Theme">
                  <ModeToggle
                    side="left"
                    sideOffset={64}
                    variant="ghost"
                    btnClassName="dark:hover:bg-sky-100/20 hover:bg-sky-300/20"
                  />
                </CustomTooltip>

                <SettingDropDown user={user} />
              </div>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
