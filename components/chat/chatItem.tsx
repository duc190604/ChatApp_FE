"use client";
import { useRouter } from "next/navigation";
import { Message } from "@/types/messages";
type Props={
    name: string;
    chatId: string;
    lastMessageContent: string;
    lastMessageTime: string;
    avatar: string;
    isOnline: boolean;
    isTyping: boolean;
    isRead: boolean;
}
export default function ChatItem({name, chatId, lastMessageContent, lastMessageTime, avatar, isOnline, isTyping, isRead}: Props) {
  const router = useRouter();
  console.log ("avatar", avatar)
  return (
    <div className="w-full h-16 flex items-center cursor-pointer hover:bg-gray-100 px-1 rounded-xl" onClick={() => router.push(`/app/chats/${chatId}`)}>
      <div className="flex relative">
        <img src={avatar} alt="profile" className="w-14 h-14 rounded-full border-2 border-gray-200" />
        {isOnline && <div className="border-1 border-white w-3 h-3 bg-green-500 rounded-full absolute top-11 left-10"></div>}
      </div>

      <div className="ml-2 flex-1 overflow-hidden">
        <p className="font-medium font-inter">{name}</p>
        <div className="flex items-center w-full">
          <p className="font-inter text-sm text-gray-500 ml-[2px] truncate overflow-hidden flex-row">
            {lastMessageContent}
          </p>
          <p className="font-inter text-[14px] font-light text-gray-400 ml-[4px] flex-shrink-0 whitespace-nowrap">
            - {new Date(lastMessageTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );
}



