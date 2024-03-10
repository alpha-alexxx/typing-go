import * as z from "zod";

import db from "@/lib/db";
import { clientSupabase, createClient } from "@/lib/supabase/client";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "📧 Email is required" })
    .email({ message: "🚫 Invalid email" })
    .refine(
      async (email: string) => {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", email);
        return data && data.length > 0;
      },
      {
        message: "User doesn't exist. Please Register your account.",
      },
    )
    .refine(
      async (email: string) => {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", email);
        if (data && data.length > 0) {
          if (data[0].provider.provider !== "email") {
            return false;
          }
          return true;
        }
      },
      {
        message:
          "User is signed up with google, please try google sign in instead.",
      },
    ),
  password: z.string().min(6, {
    message: "🔑 Password should be at least 6 characters long",
  }),
  rememberMe: z
    .boolean()
    .default(false)
    .refine((value) => value, {
      message: "🔒 Please indicate if you want to be remembered",
    }),
});

export const registerFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "📧 Email is required" })
    .email({
      message: "⚠️ Invalid email format. Please enter a valid email address.",
    })
    .refine(
      async (email: string) => {
        const { data, error } = await clientSupabase
          .from("users")
          .select("email")
          .eq("email", email);
        return !(data && data.length > 0);
      },
      {
        message:
          "🚫 User already exists. Please try another email to register.",
      },
    ),
  password: z
    .string()
    .min(6, { message: "🔒 Password should be at least 6 characters long" }),
  rememberMe: z.boolean().default(false),
});

export const updateFormSchema = z.object({
  username: z
    .string()
    .min(1)
    .min(3, { message: "📝 Username must be at least 3 characters long." })
    .max(30, { message: "⚠️ Username can't exceed 30 characters." })
    .regex(/^[a-z0-9_\-\.]+$/, {
      message:
        "⚠️ Username can only contain lowercase letters, numbers, underscore('_'), dash('-'), or period('.') and no spaces",
    })
    .refine(
      async (username) => {
        const supabase = createClient();
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();
        if (authError) {
          console.log("[AUTH_ERROR]", authError);
        }
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("username", username);

        if (data && data.length > 0) {
          if (data[0].id === user?.id) {
            return true;
          }
          return false;
        }
        return true;
      },
      {
        message: "⚠️This username has taken already! try another.",
      },
    ),
  full_name: z
    .string()
    .min(3, { message: "📝 Full name must be at least 3 characters long." })
    .max(16, { message: "⚠️ Full name can't exceed 16 characters." }),
  avatar_url: z.nullable(z.string()),
});

export const inviteFriendSchema = z.object({
  full_name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid Email Format 📧" })
    .refine(
      async (email: string) => {
        const { data, error } = await clientSupabase
          .from("users")
          .select("email")
          .eq("email", email);
        return !(data && data.length > 0);
      },
      {
        message: "🚫 User already exists. Please try another email to invite.",
      },
    ),
});
