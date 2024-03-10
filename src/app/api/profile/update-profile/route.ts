import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { formatISO } from "date-fns";

import db from "@/lib/db";
import { createClient } from "@/lib/supabase/server";

export async function PUT(req: NextRequest) {
  const { full_name, avatar_url, username } = await req.json();

  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || user?.id !== userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!full_name) {
    return new NextResponse("Full name is missing", { status: 400 });
  }

  if (!username) {
    return new NextResponse("username is missing", { status: 400 });
  }

  try {
    const profile = await db.profiles.findFirst({
      where: {
        username,
      },
    });

    if (profile) {
      if (profile?.id !== userId) {
        return new NextResponse("username exists", { status: 400 });
      }
    }

    const user = await db.public_users.update({
      where: {
        id: userId as string,
      },
      data: {
        full_name,
        avatar_url,
        profiles: {
          update: {
            where: {
              id: userId as string,
              updated_at: formatISO(new Date()),
            },
            data: {
              username,
            },
          },
        },
        updated_at: formatISO(new Date()),
      },
    });
    return NextResponse.json(
      {
        message: "User profile updated successfully",
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("[PROFILE_UPLOAD_ERROR_ON_API]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
