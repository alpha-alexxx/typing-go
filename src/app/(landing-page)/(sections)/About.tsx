import {
  WEBSITE_ABOUT_DETAILS as DETAILS,
  WEBSITE_RANKING_SYSTEM,
} from "../data";

import Section from "@/components/custom/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function About() {
  return (
    <Section id="about" name="About">
      <div className="relative lg:grid lg:grid-cols-2">
        <div className="">
          <h3 className="text-4xl  font-bold">{DETAILS.question}</h3>
          <p className="mt-4 px-3 text-lg leading-relaxed text-gray-400">
            {DETAILS.answer}
          </p>

          <ul className="mt-4 list-disc px-4 text-sm leading-relaxed text-gray-400">
            {DETAILS.about_details.map((detail, index) => (
              <li className="mt-2 text-left" key={detail}>
                {detail}
              </li>
            ))}
          </ul>
          <div className="group-btn mt-4 flex w-full flex-row items-center justify-center gap-4 md:justify-start">
            <Button>Register</Button>
            <Button variant={"outline"}>Tour the Platform</Button>
          </div>
        </div>
        <div className=" item-center relative mt-4 flex justify-center ">
          <Skeleton className="h-[30rem] w-[95%] bg-slate-200 md:h-[25rem] md:w-[40rem]" />
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-lg font-bold underline underline-offset-4">
          Ranking System:
        </h3>
        <div className="mt-4 grid grid-cols-1 place-content-center place-items-stretch gap-8 px-4 md:grid-cols-2">
          {WEBSITE_RANKING_SYSTEM.map((feature, index) => (
            <Card key={feature.label} className="relative">
              <Badge variant={"default"} className="absolute -left-5 top-2">
                {feature.label}
              </Badge>
              <CardHeader className="mt-5">
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
