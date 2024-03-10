import Image from "next/image";
import { WEBSITE_SHORT_DESC } from "../data";
import { Play } from "lucide-react";

import { urbanist } from "@/assets/fonts";
import Section from "@/components/custom/Section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <>
      <Section id="home">
        <div className="mt-24 flex h-full w-full flex-col items-center justify-center gap-4 lg:mt-0  lg:grid lg:grid-cols-3">
          <div className="flex flex-col items-center justify-center md:col-span-2">
            <div className="flex flex-col gap-2">
              <h1
                className={cn(
                  "tagline z-1 relative flex flex-col text-center text-3xl font-extrabold lg:text-left",
                  urbanist.className,
                )}
              >
                <div>
                  <div className="flex flex-row  items-center justify-center gap-2 lg:items-end lg:justify-start">
                    <span>
                      Type with{" "}
                      <span className="bg-gradient-to-r from-primary to-pink-800 bg-clip-text text-4xl  font-extrabold text-transparent md:text-5xl">
                        Confidence
                      </span>
                      ,
                    </span>
                  </div>
                </div>
                {/* <KeyboardIcon
                                    className="mx-auto z-[-2] blur-sm flex items-center justify-center absolute inset-0 w-48 h-48 text-primary"
                                    aria-hidden
                                /> */}
                <div className="lg:ml-[20rem]">
                  <span>
                    Type with
                    <span className="bg-gradient-to-l from-primary to-pink-800 bg-clip-text text-4xl  font-extrabold text-transparent md:text-5xl">
                      Typing
                      <span className="italic underline decoration-primary decoration-double">
                        Go
                      </span>
                    </span>
                  </span>
                </div>
              </h1>
              <p className="mt-10 px-4 text-center text-lg leading-relaxed text-gray-400 md:px-8 md:text-lg lg:px-12 lg:text-base">
                {WEBSITE_SHORT_DESC}
              </p>
            </div>

            <div className="group-buttons mt-8 flex items-center justify-center gap-4 md:mt-6 lg:mt-4">
              <Button size={"lg"}>Try for free</Button>
              <Button size={"default"} variant="link" className="gap-2">
                <Play className="h-8 w-8 rounded-full bg-white p-2 text-primary shadow-lg dark:bg-slate-800" />
                See how it works?
              </Button>
            </div>
          </div>

          <div className="illustration relative z-0 mt-4 flex h-[20rem] w-full items-center justify-center md:h-[28rem]  md:w-full lg:max-h-[40rem] lg:min-w-0 lg:max-w-[28rem]">
            <div className="relative h-full w-full">
              <Image
                src={"/illustration/typing-women-hero.svg"}
                alt="A user typing on laptop."
                className="h-auto w-auto object-contain"
                fill
                priority
              />
              <Image
                src={"/illustration/hero-blob.svg"}
                alt="blob"
                aria-hidden="true"
                className="absolute inset-0 z-[-1] object-contain"
                fill
                priority
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
