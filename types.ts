import { Member, Profile, Server } from "@prisma/client";

export type I_ServerIdParams = {
  serverId: string;
};
export type I_MemeberIdParams = {
  memberId: string;
};
export type I_ChannelIdParams = {
  channelId: string;
};

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};
