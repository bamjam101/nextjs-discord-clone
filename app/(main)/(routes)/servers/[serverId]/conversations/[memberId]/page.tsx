import { getOrCreateConversation } from "@/actions/conversation";
import { currentProfile } from "@/actions/profile";
import ChatHeader from "@/components/chat/ChatHeader";
import { db } from "@/lib/database";
import { I_MemeberIdParams, I_ServerIdParams } from "@/types";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

type MemberIdPageProps = I_ServerIdParams & I_MemeberIdParams;

const MemberIdPage = async ({ params }: { params: MemberIdPageProps }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    return redirect("/");
  }

  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  );

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <section className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        serverId={params.serverId}
        type="conversation"
      />
    </section>
  );
};

export default MemberIdPage;
