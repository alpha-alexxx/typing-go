import React from "react";
import { Mail, Phone } from "lucide-react";

import ContactForm from "@/components/custom/ContactForm";
import Section from "@/components/custom/Section";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <Section id="contact" name="contact">
      <div className="grid w-full grid-cols-1 place-content-center gap-4 md:grid-cols-2">
        <div className="w-full">
          <span className="text-2xl font-extrabold">Get in Touch with Us</span>
          <p className="font-sm text-gray-400 ">
            Thank you for reaching out to us! We value your feedback, questions,
            and inquiries. Feel free to contact us using the information
            provided below, and we&#39;ll do our best to assist you
          </p>
          <div className="group-btn mt-4 flex flex-row justify-start  gap-4">
            <Button variant={"default"} className="gap-2 text-white">
              <Mail className="h-4 w-4" />
              Email Me
            </Button>
            <Button variant={"outline"} className="gap-2">
              <Phone className="h-4 w-4" />
              Call Me
            </Button>
          </div>
        </div>
        <div className="w-full">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
};

export default Contact;
