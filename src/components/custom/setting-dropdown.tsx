import Link from "next/link";
import { useRouter } from "next/navigation";
import { buttonVariants } from "../ui/button";
import { profiles } from "@prisma/client";
import {
  HelpCircle,
  Lightbulb,
  LogOut,
  MessageSquareCode,
  Settings,
  User,
  UserPlus,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const SettingDropDown = ({ user }: { user: profiles }) => {
  const { onOpen } = useModal();
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error while logging out!", {
        description: "Please try again!",
      });
      return null;
    }
    toast.success("Logged out Successfully", {
      description: "You have been logged out.",
    });
    router.replace("/");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="group outline-none ">
        <div
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-10 w-10 rounded-full",
          )}
        >
          <Settings className="cursor-pointer outline-none group-active:animate-spin" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mb-8 w-56" side="right" sideOffset={20}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-x-2 text-sm" asChild>
          <Link href={`/account/${user?.id}`}>
            <User className="size-5" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-x-2 text-sm">
          <Wallet className="size-5" />
          <span>Subscription</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* User's Things */}
        <DropdownMenuItem
          className="gap-x-2 text-sm"
          onClick={() => onOpen("invite-new-user", { profile: user })}
        >
          <UserPlus className="size-5" />
          <span>Invite Your Friend</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-x-2 text-sm">
          <HelpCircle className="size-5" />
          <span>Help & Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* Feedback and Suggestions */}
        <DropdownMenuItem className="gap-x-2 text-sm">
          <MessageSquareCode className="size-5" />
          <span>Feedback and Complaint</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-x-2 text-sm">
          <Lightbulb className="size-5" />
          <span>Features Suggestion</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* Logout Button */}
        <DropdownMenuItem
          className={
            "group w-full gap-x-2 border-2 border-rose-500 text-sm text-rose-500 focus:bg-rose-500 focus:text-white"
          }
          onClick={handleLogout}
        >
          <LogOut className="size-5" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingDropDown;
