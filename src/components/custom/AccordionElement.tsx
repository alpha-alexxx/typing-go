import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const AccordionElement = ({
  question,
  answer,
  className,
}: {
  question: string;
  answer: string;
  className?: string;
}) => {
  return (
    <Accordion type="single" collapsible className={cn(className)}>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-left">{question}</AccordionTrigger>
        <AccordionContent>{answer}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionElement;
