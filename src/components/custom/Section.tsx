import React from "react";

import { cn } from "@/lib/utils";

const Section = ({
  id,
  name,
  children,
  className,
}: {
  id: string;
  name?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      id={id}
      className={cn(
        "relative flex h-full flex-col items-center justify-center py-8",
        className,
      )}
    >
      {name && (
        <h2 className="mb-8 bg-gradient-to-r from-primary to-pink-700 bg-clip-text text-center font-bold uppercase text-transparent  underline decoration-primary decoration-double underline-offset-4">
          {name}
        </h2>
      )}
      {children}
    </section>
  );
};

export default Section;
