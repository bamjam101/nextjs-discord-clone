import { I_ServerIdParams } from "@/types";

import { NextResponse } from "next/server";

import { currentProfile } from "@/actions/getProfile";
import { db } from "@/lib/database";

export async function PATCH(
  request: Request,
  { params }: { params: I_ServerIdParams }
) {
  try {
    const profile = await currentProfile();

    const { name, imageUrl } = await request.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_PATCH]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
