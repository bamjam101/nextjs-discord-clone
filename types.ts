import { Member, Profile, Server } from "@prisma/client";

export type I_ServerIdParams = {
  serverId: string;
};

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};
