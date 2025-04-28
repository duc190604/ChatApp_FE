// lib/auth.ts
import { setAccessToken, setRefreshToken } from "@/redux/features/authSlice";
import { setUser } from "@/redux/features/authSlice";
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate user tại đây (có thể gọi tới DB)
         try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/login`, {
        email: credentials?.email,
        password: credentials?.password,
      });
      const data = response.data;
      if (response.status === 200) {
        return {
          id: data.user.id,
          username: data.user.username,
          email: data.user.email,
          avatar: data.user.avatar,
          description: data.user?.description || "",
          userBlocked: data.user?.userBlocked || [],
          chatBlocked: data.user?.chatBlocked || [],
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          lastSeen: data.user?.lastSeen || null,
        };
      }
    } catch (error: any) {
      console.log(error);
      return null;
        }

        return null; // nếu return null → đăng nhập thất bại
      },
    }),
  ],
  pages: {
    signIn: "/auth/login", // trang login custom
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 ngày
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
       token.id = user.id;
       token.username = user.username;
       token.email = user.email;
       token.avatar = user.avatar;
       token.description = user.description;
       token.userBlocked = user.userBlocked;
       token.chatBlocked = user.chatBlocked;
       token.accessToken = user.accessToken;
       token.refreshToken = user.refreshToken;
       token.lastSeen = user.lastSeen;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.avatar = token.avatar;
        session.user.description = token.description;
        session.user.userBlocked = token.userBlocked;
        session.user.chatBlocked = token.chatBlocked;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.lastSeen = token.lastSeen;
      }
      return session;
    },
  },
};
