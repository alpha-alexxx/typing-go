import React from "react";
import { Metadata } from "next";
import { About, Contact, Features, Hero, Questionnaire } from "./(sections)";

import MaxWidthWrapper from "@/components/custom/MaxWidthWrapper";

export const metadata: Metadata = {
  title: {
    absolute: "TypingGo - Learn Typing with interactive sessions.",
  },
};
const Page = () => {
  return (
    <>
      <MaxWidthWrapper bgColor="bg-slate-100 dark:bg-gray-800">
        <Hero />
      </MaxWidthWrapper>
      <MaxWidthWrapper
        bgColor="bg-slate-100/50 dark:bg-gray-800/50"
        paddingTop="pt-10"
      >
        <About />
      </MaxWidthWrapper>
      <MaxWidthWrapper
        bgColor="bg-slate-200/50 dark:bg-gray-800/50"
        paddingTop="pt-10"
      >
        <Features />
      </MaxWidthWrapper>
      <MaxWidthWrapper
        bgColor="bg-slate-100/50 dark:bg-gray-800/50"
        paddingTop="pt-10"
      >
        <Questionnaire />
      </MaxWidthWrapper>
      <MaxWidthWrapper
        bgColor="bg-slate-100/50 dark:bg-gray-800/50"
        paddingTop="pt-10"
      >
        <Contact />
      </MaxWidthWrapper>
    </>
  );
};

export default Page;
