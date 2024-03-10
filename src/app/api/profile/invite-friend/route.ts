import { NextRequest, NextResponse } from "next/server";

import InviteUserEmail from "@/components/emails/invite-users";
import db from "@/lib/db";
import { resend } from "@/lib/resend";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const { full_name, email } = await req.json();
  const userId = searchParams.get("userId");
  const supabase = createClient();
  console.log(full_name, email, userId);
  const { data, error } = await supabase.auth.getUser();

  const user = await db.public_users.findFirst({
    where: {
      email: email,
    },
  });

  if (!email || !full_name) {
    return new NextResponse("The email or friend's name not given.", {
      status: 400,
    });
  }

  if (user) {
    return new NextResponse(
      "The invited user already exists in our database.",
      {
        status: 400,
      },
    );
  }

  if (!userId) {
    return new NextResponse("UserId not Found", {
      status: 400,
    });
  }

  if (error) {
    return new NextResponse("Unauthorized! You are not logged in", {
      status: 401,
    });
  }

  if (data?.user.id !== userId) {
    return new NextResponse(
      "You do not have permission to invite any person.",
      { status: 400 },
    );
  }

  try {
    const user = await db.public_users.findUnique({
      where: {
        id: userId as string,
      },
      include: {
        profiles: true,
        users: true,
      },
    });

    if (!user) {
      return new NextResponse("User not found in our database.", {
        status: 400,
      });
    }
    const data = await resend.emails.send({
      from: "typingGo-invite@lethargicweb.online",
      to: email as string,
      subject: `You are invited to TypingGo by ${user?.full_name}`,
      react: InviteUserEmail({
        full_name,
        invitedByUsername: user?.profiles?.username || "not given",
        invitedByEmail: user?.email as string,
        inviteeProfileAvatar: user?.avatar_url as string,
      }),
    });
    console.log(data);
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log("[INVITE_FRIEND_API_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
