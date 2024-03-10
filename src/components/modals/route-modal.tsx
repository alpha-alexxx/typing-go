"use client";

import React from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RouteModalProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const RouteModal = ({ title, description, children }: RouteModalProps) => {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="w-[90%] rounded-xl lg:w-auto">
        <DialogHeader>
          <DialogTitle className="mb-2 text-4xl font-bold">{title}</DialogTitle>
          {description && (
            <DialogDescription className="mb-8 text-gray-600">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default RouteModal;
