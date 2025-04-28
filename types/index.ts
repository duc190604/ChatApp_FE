export * from "./chat";
export * from "./messages";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    email: string;
    avatar: string;
    description?: string;
    userBlocked?: string[];
    chatBlocked?: string[];
    accessToken: string;
    refreshToken: string;
    lastSeen?: string;
  }
}

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    email: string;
    avatar: string;
    description?: string;
    userBlocked?: string[];
    chatBlocked?: string[];
    accessToken: string;
    refreshToken: string;
    lastSeen?: string;
  }
  interface Session {
    user: User;
  }
}
