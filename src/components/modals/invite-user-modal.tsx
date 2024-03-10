"use client";

import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader } from "lucide-react";
import queryString from "query-string";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { inviteFriendSchema } from "@/constants/formSchema";
import { useModal } from "@/hooks/use-modal-store";

const InviteUserModal = () => {
  const { isOpen, data, type, onClose } = useModal();
  const form = useForm({
    resolver: zodResolver(inviteFriendSchema),
    defaultValues: {
      full_name: "",
      email: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const { profile } = data;
  const isDialogOpen = isOpen && type === "invite-new-user";

  async function onSubmit(values: z.infer<typeof inviteFriendSchema>) {
    try {
      const { email, full_name } = values;
      const userId = profile?.id;
      const url = queryString.stringifyUrl({
        url: "/api/profile/invite-friend",
        query: {
          userId,
        },
      });

      const response = await axios.post(url, { email, full_name });
      const message = response.data.message;
      toast.success(message || "Invite Request send");
    } catch (error: any) {
      console.log("[INVITE_ERROR_FRONTEND]", error);
      toast.error(error?.message || "Oops! Something went wrong");
    }
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite Your Friend</DialogTitle>
          <DialogDescription>
            Please provide your friend&#39;s email address to invite on this app
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Friend&#39;s Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Rohit Kumar" {...field} />
                  </FormControl>
                  <FormDescription>
                    Write your friend&#39;s email address whom you want to
                    invite.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="yourfriend@gmail.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Write your friend&#39;s email address whom you want to
                    invite.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <Button disabled={isLoading}>
                {isLoading && <Loader className="size-4 animate-spin" />}
                Invite Friend
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUserModal;
