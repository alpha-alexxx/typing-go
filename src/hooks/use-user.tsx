import { useCallback, useEffect, useState } from "react";
import { profiles, public_users } from "@prisma/client";
import { QueryData, User } from "@supabase/supabase-js";

import db from "@/lib/db";
import { supabase } from "@/lib/supabase/client";

export const useUser = () => {
  const [user, setUser] = useState<public_users>();
  const [error, setError] = useState<Error | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;

        const user = await db.public_users.findFirst({
          where: {
            id: data.user.id,
          },
        });
        console.log(user);
        if (!user) {
          throw new Error("Unauthorized");
        }
        if (user) {
          setUser(user);
        }
      } catch (error: any) {
        setError(error);
      }
    };
    setIsMounted(true);
    if (isMounted) {
      fetchUser();
    }
  }, [isMounted]);
  return { user, error, isMounted };
};
