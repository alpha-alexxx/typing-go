"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(5, { message: "Name is required" }).max(100),
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  comment: z
    .string()
    .min(40, { message: "comment should be at least 40 characters" })
    .max(500, {
      message: "Comment is limited to 500 characters.",
    }),
});

type ValidationSchema = z.infer<typeof formSchema>;
const ContactForm = () => {
  const form = useForm<ValidationSchema>({
    resolver: zodResolver(formSchema),
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = form;

  const onSubmitHandler = (values: ValidationSchema) => {};

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-c-primary-marine-blue flex items-center justify-between">
                Full Name
                <FormMessage>{errors.name?.message}</FormMessage>
              </FormLabel>
              <FormControl>
                <Input
                  className={cn(
                    "placeholder:text-c-neutral-cool-gray border-c-neutral-light-gray text-c-primary-marine-blue placeholder:font-medium",
                    {
                      "border-c-primary-strawberry-red": errors.name?.message,
                    },
                  )}
                  placeholder="e.g. Stephen King"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-c-primary-marine-blue flex items-center justify-between">
                Email Address
                <FormMessage>{errors.email?.message}</FormMessage>
              </FormLabel>
              <FormControl>
                <Input
                  className={cn(
                    "placeholder:text-c-neutral-cool-gray border-c-neutral-light-gray text-c-primary-marine-blue placeholder:font-medium",
                    {
                      "border-c-primary-strawberry-red": errors.email?.message,
                    },
                  )}
                  placeholder="e.g. stephenking@lorem.com"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-c-primary-marine-blue flex items-center justify-between">
                Your Message
                <FormMessage>{errors.comment?.message}</FormMessage>
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={8}
                  className={cn(
                    "placeholder:text-c-neutral-cool-gray border-c-neutral-light-gray text-c-primary-marine-blue resize-none placeholder:font-medium",
                    {
                      "border-c-primary-strawberry-red":
                        errors.comment?.message,
                    },
                  )}
                  placeholder="Hey, I am ..."
                  {...field}
                />
              </FormControl>
              <p className="text-right text-sm text-gray-400">
                {watch("comment")?.length || 0}/500
              </p>
            </FormItem>
          )}
        />
        <Button className="md:ml-auto" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
