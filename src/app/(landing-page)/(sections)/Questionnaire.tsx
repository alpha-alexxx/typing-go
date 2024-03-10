import React from "react";
import { CURATED_FOR, FREQUENTLY_ASKED_QUESTIONS } from "../data";
import EmailSignUp from "./EmailSignUp";
import { Target } from "lucide-react";

import AccordionElement from "@/components/custom/AccordionElement";
import Section from "@/components/custom/Section";

const Questionnaire = () => {
  return (
    <Section id="f&qs" name="Exams and F&Qs">
      <div className="grid w-full grid-cols-1 place-content-around content-between gap-4 md:grid-cols-2">
        <div className="flex flex-col items-start justify-center">
          {CURATED_FOR.map((item) => (
            <React.Fragment key={item.heading}>
              <div className="flex flex-row  items-center justify-start  gap-2 text-lg font-semibold text-primary">
                <Target className="h-8 w-8 p-0.5" />
                <span>{item.heading}</span>
              </div>
              <ul className="ml-12 list-disc px-1">
                {item.list.map((str) => (
                  <li className="text-gray-400" key={str}>
                    {str}
                  </li>
                ))}
              </ul>
            </React.Fragment>
          ))}
        </div>
        <div className="flex w-full flex-col items-start justify-center">
          <span className="mb-4 text-lg font-medium">
            Frequently Asked Questions:
          </span>
          {FREQUENTLY_ASKED_QUESTIONS.map((qSet, index) => (
            <AccordionElement key={qSet.answer} className="w-full" {...qSet} />
          ))}
        </div>
      </div>
      <EmailSignUp />
    </Section>
  );
};

export default Questionnaire;
