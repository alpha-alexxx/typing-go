"use client";

import CustomTooltip from "./custom-tooltip";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  name: string | undefined | null;
  src: string | undefined | null;
  tooltipSide?: "top" | "bottom" | "left" | "right";
}
const UserAvatar = ({ name, src, tooltipSide }: UserAvatarProps) => {
  return (
    <CustomTooltip label={name} side={tooltipSide}>
      <Avatar>
        {src && <AvatarImage src={src} />}
        <AvatarFallback className="bg-primary text-primary-foreground">
          {name?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </CustomTooltip>
  );
};

export default UserAvatar;
