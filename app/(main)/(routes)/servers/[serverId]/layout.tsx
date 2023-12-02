import React from "react";

import { redirect } from "next/navigation";
import { redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/database";
import { I_ServerIdParams } from "@/types";
import { currentProfile } from "@/actions/profile";

import ServerSidebar from "@/components/server/ServerSidebar";

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: I_ServerIdParams;
}) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }
  return (
    <div className="h-full">
      <aside className="hidden md:flex h-fulll w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </aside>

      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
