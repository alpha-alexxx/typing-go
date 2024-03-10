import React from "react";
import Image from "next/image";
import UserAvatar from "../custom/user-avatar";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

const LoadingSidebar = () => {
  return (
    <div className="flex min-h-screen grow flex-col gap-y-5 overflow-y-auto border-r-2 border-primary/10 bg-secondary/50 px-6 backdrop-blur-md">
      <div className="mt-2 flex h-16 shrink-0 items-center space-x-3">
        <Skeleton className="size-8 object-contain" />
        <Skeleton className="h-6 w-32">
          <span className="sr-only text-2xl font-bold">TypingGo</span>
        </Skeleton>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              <div className="-mx-2 flex flex-col">
                {Array(6)
                  .fill("_")
                  .map((_, i) => (
                    <li
                      className="group relative flex h-12 w-full items-center justify-start rounded-md  p-2 transition duration-100"
                      key={i}
                    >
                      <Skeleton className="h-full w-full" />
                    </li>
                  ))}
              </div>
            </ul>
          </li>
          <div className="-mx-6 mt-auto">
            <Separator className="mx-auto mt-auto h-0.5" />
            <li className="flex items-center justify-between pr-4">
              <div
                className={
                  "ml-2 flex items-center gap-x-2 px-1 py-3 text-sm font-semibold leading-6 transition duration-100"
                }
              >
                <Skeleton className="size-8 rounded-full">
                  <div className="sr-only">Avatar</div>
                </Skeleton>
                <Skeleton className="h-4 w-28">
                  <div className="sr-only">Name</div>
                </Skeleton>
              </div>
              <div className="flex flex-row gap-x-2">
                <Skeleton className="size-8 rounded-xl" />
                <Skeleton className="size-8 rounded-xl" />
              </div>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default LoadingSidebar;
