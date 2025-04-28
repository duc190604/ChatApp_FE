"use client";
import ListChat from "@/components/chat/listChat";
import ChatComponent from "@/components/chat/chat";
import { Chat } from "@/types";
import InfoChat from "@/components/chat/infoChat";
import { AssetChat } from "@/components/chat/assetChat";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import  {useSelector}  from "react-redux";
import { RootState } from "@/redux/store";
export default function ChatPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { id } = useParams();
  const { data: chat , isLoading, error } = useQuery({
    queryKey: ["chat", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/v1/chat/${id}`);
      console.log("res", res.data)
      if(res.status === 200){
        return res.data;
      }
      return [];
    },
    refetchOnWindowFocus: false,
  });
  // const chat: Chat = {
  //   id: "1",
  //   name: "John Doe",
  //   lastMessage: {
  //     id: "1",
  //     content: "Hello",
  //     senderId: "1",
  //     receiverId: "2",
  //     createdAt: new Date(),
  //     type: "text",
  //   },
  //   avatar:
  //     "https://res.cloudinary.com/dq6kplkok/image/upload/v1741189481/chat-app/u0yomwtxhlr3urxgql8z.png",
  //   members: ["1", "2"],
  //   isOnline: true,
  // };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="w-full h-full flex">
        <div className="w-2/3 h-full">
          {chat && <ChatComponent chat={chat} />}
        </div>
        <div className="w-1/3 h-full">
          <InfoChat />
        </div>
    </div>
  );
}
