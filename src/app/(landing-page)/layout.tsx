"use client";

import React from "react";
import { useSelectedLayoutSegments } from "next/navigation";

import { ModeToggle } from "@/components/custom/ModeToggle";
import Footer from "@/components/LandingFooter/Footer";
import { Navbar } from "@/components/LandingNavbar";

const LandingLayout = ({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) => {
  const loginSegments = useSelectedLayoutSegments("auth");
  return (
    <>
      <Navbar />
      <main className="relative">
        {children}
        {loginSegments.length > 1 && (
          <div className="fixed inset-0  z-[30] min-h-screen w-full backdrop-blur-sm">
            {auth}
          </div>
        )}
        <ModeToggle
          className="fixed bottom-4 left-4 md:bottom-10 lg:bottom-16 lg:left-8"
          side="right"
        />
      </main>

      <Footer />
    </>
  );
};

export default LandingLayout;
