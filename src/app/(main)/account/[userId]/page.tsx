import { toast } from "sonner";

import AccountSetting from "@/components/pages/account/account-setting";
import db from "@/lib/db";

const AccountPage = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const profile = await db.profiles.findFirst({
    where: {
      id: userId,
    },
    include: {
      users: true,
    },
  });

  if (!profile) {
    toast.error("User not found");
    return <>User not found</>;
  }

  return (
    <div className="min-h-screen flex-1">
      <AccountSetting profile={profile} />
    </div>
  );
};

export default AccountPage;
