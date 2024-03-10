import { ReactNode, Suspense } from "react";

import Sidebar from "@/components/custom/sidebar";
import LoadingSidebar from "@/components/loading/loading-sidebar";
import db from "@/lib/db";
import { createClient } from "@/lib/supabase/server";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw error;
  }
  const user = await db.profiles.findUnique({
    where: {
      id: data?.user?.id,
    },
  });
  if (!user) {
    return (
      <main className="flex min-h-screen flex-row items-start justify-start">
        <div className="min-h-screen w-64">
          <Suspense fallback={<LoadingSidebar />}>
            User not found
            <code>{JSON.stringify(error)}</code>
          </Suspense>
        </div>
        <div className="flex w-full flex-1">{children}</div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-row items-start justify-start">
      <div className="min-h-screen w-64">
        <Suspense fallback={<LoadingSidebar />}>
          <Sidebar user={user} />
        </Suspense>
      </div>
      <div className="flex w-full flex-1">{children}</div>
    </main>
  );
};

export default DashboardLayout;
