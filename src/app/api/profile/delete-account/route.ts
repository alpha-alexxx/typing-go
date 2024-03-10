import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(req: NextRequest) {
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

  try {
    const account = await db.auth_users.delete({
      where: {
        id: user?.id as string,
      },
    });

    if (!account) {
      return new NextResponse("Database query error", { status: 403 });
    }
    const cookieStore = cookies();
    cookieStore.getAll().forEach((cookie) => {
      cookieStore.delete(cookie.name);
    });

    return NextResponse.json(
      {
        message: "User deleted successfully",
        // account,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("[DELETE_ACCOUNT_ERROR_ON_API]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
