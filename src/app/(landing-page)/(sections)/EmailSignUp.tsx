import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EmailSignUp = () => {
  return (
    <div className="mt-4 flex w-full flex-col md:flex-row">
      <div className="flex flex-col items-start gap-4 md:w-3/5">
        <h2 className="text-center text-2xl font-semibold md:text-left">
          Ready to Type Your Success Story? Register Today!
        </h2>
        <p className="text-sm text-gray-400">
          Unlock faster, more accurate typing by joining TypingGo. Register
          today and become part of a dedicated community that&#39;s committed to
          helping you achieve your typing goals.
        </p>
      </div>
      <div className="mt-4 flex items-center justify-center gap-1 md:w-2/5">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="email" placeholder="Email" />
          <Button type="submit">Register</Button>
        </div>
      </div>
    </div>
  );
};

export default EmailSignUp;
