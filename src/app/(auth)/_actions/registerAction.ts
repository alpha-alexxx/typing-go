"use server";

import * as z from "zod";

import { registerFormSchema } from "@/constants/formSchema";
import db from "@/lib/db";
import { createClient } from "@/lib/supabase/server";

export async function registerAction({
  email,
  password,
}: z.infer<typeof registerFormSchema>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);
  console.log(data, error);
  if (data && data?.length > 0)
    return {
      error: {
        message: "User already exist. Please try another email to register.",
      },
    };

  const response = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  return response;
}
