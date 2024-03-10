import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { formatISO } from "date-fns";

import db from "@/lib/db";
import { createClient } from "@/lib/supabase/server";

export async function PUT(req: NextRequest) {
  const { newPassword, confirmPassword } = await req.json();

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

  if (!newPassword || !confirmPassword) {
    return new NextResponse("password is missing", { status: 400 });
  }

  try {
    const findSameUser = await db.public_users.findFirst({
      where: {
        id: userId,
      },
    });
    if (!findSameUser) {
      return new NextResponse("The user doesn't exist in our database.", {
        status: 400,
      });
    }
    if (findSameUser) {
      //@ts-ignore
      if (findSameUser?.provider?.provider !== "email") {
        return new NextResponse(
          "You are using social account for login. You don't need to change password.",
          { status: 400 },
        );
      }
    }
    if (newPassword !== confirmPassword) {
      return new NextResponse(
        "Password doesn't match the confirmation password.",
        { status: 400 },
      );
    }
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw error;
    }

    return NextResponse.json(
      {
        message: "User Password changed successfully",
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("[CHANGE_PASSWORD_ERROR_ON_API]", error);
    return NextResponse.json(
      { message: "Internal Error", error: error },
      { status: 500 },
    );
  }
}
