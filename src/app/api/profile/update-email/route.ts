import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { formatISO } from "date-fns";

import db from "@/lib/db";
import { createClient } from "@/lib/supabase/server";

export async function PUT(req: NextRequest) {
  const { email } = await req.json();

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

  if (!email) {
    return new NextResponse("Email is missing", { status: 400 });
  }

  try {
    const findSameUser = await db.public_users.findFirst({
      where: {
        email,
      },
    });

    if (findSameUser) {
      //@ts-ignore
      if (findSameUser?.provider?.provider !== "email") {
        return new NextResponse(
          "You are using social account for login. You can't change your email.",
          { status: 400 },
        );
      }

      return new NextResponse(
        "This email is already registered with us. Please add another email.",
        { status: 400 },
      );
    }
    const updatedUser = await db.auth_users.update({
      where: {
        id: user?.id as string,
      },
      data: {
        email: email,
        users: {
          update: {
            email,
          },
        },
      },
    });

    if (!updatedUser) {
      throw error;
    }

    return NextResponse.json(
      {
        message: "User email updated successfully",
        updatedUser,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("[UPDATE_EMAIL_ERROR_ON_API]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
