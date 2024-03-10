import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";
import { createClient } from "@/lib/supabase/server";

export async function PUT(req: NextRequest) {
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

  const formData = await req.formData();
  const profilePic = formData.get(userId) as File;

  if (!profilePic || !profilePic.type.startsWith("image/")) {
    return new NextResponse("This is not an image type file.", { status: 400 });
  }

  try {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(`${userId}.${profilePic.type.split("/")[1]}`, profilePic, {
        cacheControl: "3600",
        upsert: true,
        contentType: profilePic.type,
      });

    if (uploadError) {
      console.error("[PROFILE_UPLOAD_ERROR]", uploadError);
      return new NextResponse("Internal Error", { status: 500 });
    }

    const {
      data: { publicUrl: avatar_url },
    } = supabase.storage.from("avatars").getPublicUrl(uploadData.path);

    return NextResponse.json({
      message: "Image Uploaded successfully",
      avatar_url,
    });
  } catch (error: any) {
    console.error("[PROFILE_UPLOAD_ERROR_ON_API]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const avatar = searchParams.get("avatar");
  if (!userId) {
    return new NextResponse("Bad Request", { status: 400 });
  }
  if (!avatar) {
    return new NextResponse("Avatar url not found", { status: 401 });
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || user?.id !== userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    if (avatar.includes(userId)) {
      const { data: deleteData, error: deleteError } = await supabase.storage
        .from("avatars")
        .remove([avatar]);

      if (deleteError) {
        console.error("[PROFILE_PHOTO_DELETE_ERROR]", deleteError);
        return new NextResponse("Internal Error", { status: 500 });
      }

      await db.public_users.update({
        where: {
          id: userId,
        },
        data: {
          avatar_url: null,
        },
      });
      return new NextResponse(
        JSON.stringify({ message: "Profile images deleted!" }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    await db.public_users.update({
      where: {
        id: userId,
      },

      data: {
        avatar_url: null,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "Profile images deleted!" }),
    );
  } catch (error: any) {
    console.error("[PROFILE_IMAGE_DELETE_ERROR_ON_API]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
