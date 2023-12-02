import React from "react";

import { redirectToSignIn } from "@clerk/nextjs";

import { currentProfile } from "@/actions/profile";
import { I_ChannelIdParams, I_ServerIdParams } from "@/types";
import { db } from "@/lib/database";
import { redirect } from "next/navigation";
import ChatHeader from "@/components/chat/ChatHeader";

type ChannelIdPageProps = I_ChannelIdParams & I_ServerIdParams;

const ChannelIdPage = async ({ params }: { params: ChannelIdPageProps }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    return redirect("/");
  }

  return (
    <section className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
    </section>
  );
};

export default ChannelIdPage;