import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export const HoverEffect = ({
  items,
  className,
  activePath,
}: {
  items: {
    name: string;
    href: string;
    icon: LucideIcon;
    count?: number;
  }[];
  className?: string;
  activePath: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div className={cn("-mx-2 flex h-12 flex-col", className)}>
      {items.map((item, idx) => (
        <Link
          href={item?.href}
          key={item?.name}
          className={cn(
            "group relative flex h-12 w-full items-center justify-start rounded-md  p-2 transition duration-100",
            {
              " bg-primary text-primary-foreground": item.href === activePath,
            },
          )}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 -z-10 flex h-12 w-full items-center justify-start rounded-md bg-primary/20  shadow-sm"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <li
            className={cn(
              "flex items-center justify-start gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
            )}
          >
            <item.icon
              className={cn(
                item.href === activePath
                  ? "text-sky-600"
                  : "text-gray-400 group-hover:text-sky-600",
                "h-6 w-6 shrink-0",
              )}
              aria-hidden="true"
            />
            {item.name}
          </li>
        </Link>
      ))}
    </div>
  );
};
