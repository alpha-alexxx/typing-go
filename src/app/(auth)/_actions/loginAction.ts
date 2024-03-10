"use server";

import * as z from "zod";

import { loginFormSchema } from "@/constants/formSchema";
import { createClient } from "@/lib/supabase/server";

export default async function loginAction({
  email,
  password,
}: z.infer<typeof loginFormSchema>) {
  const supabase = createClient();
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return response;
}
