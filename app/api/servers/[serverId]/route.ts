import { I_ServerIdParams } from "@/types";

import { NextResponse } from "next/server";

import { currentProfile } from "@/actions/profile";
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
    console.log("[SERVER_ID_PATCH]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: I_ServerIdParams }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }

    const server = await db.server.delete({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID_DELTE]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
