"use client";
import { Chat } from "@/types";
import { useEffect, useRef, useState } from "react";
import { MdInsertEmoticon } from "react-icons/md";
import { IoClose, IoMic } from "react-icons/io5";
import { RiAttachment2 } from "react-icons/ri";
import { BsSend } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { FaRegFileLines } from "react-icons/fa6";
import MyMessage from "./myMessage";
import OtherMessage from "./otherMessage";
import useClickOutside from "@/hooks/clickOutside";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { Message } from "@/types/messages";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "sonner";
import ChatInput from "./chatInput";

export default function ChatComponent({ chat }: { chat: Chat }) {
  console.log("chat",chat) 
  const queryClient = useQueryClient();
  const {user}=useSelector((state:RootState)=>state.auth)
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const pickerRef = useClickOutside<HTMLDivElement>(() => setIsOpenEmoji(false));
  const listRef=useRef<HTMLDivElement>(null)
  const { data: messages = [] as Message[], isLoading, error } = useQuery({
    queryKey: ["messages", chat.id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/v1/message/${chat.id}`);
      if (response.status === 200) {
        return response.data;
      }
      return []
    },
    refetchOnWindowFocus: false,
  });
  useEffect(()=>{
    if(listRef.current){
      const list=listRef.current as HTMLDivElement
      list.scrollTop=list.scrollHeight
    }
  },[messages])
  

  
  return (
    <div className="w-full h-full flex flex-col border-r border-gray-200 shadow-lg">
      <div className="h-[60px] w-full bg-gray-100 flex items-center px-4">
        <div className="flex items-center relative h-full">
          <img
            src={chat.avatar}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          {chat.isOnline && (
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full absolute top-9 left-[30px]"></div>
          )}
        </div>
        <div className="ml-2">
          <p className="text-lg font-bold font-inter">{chat.name}</p>
          {chat.isOnline && (
            <p className="text-sm text-gray-500 font-inter -mt-1 ml-[2px] font-light ">
              Active
            </p>
          )}
        </div>
      </div>
      <div ref={listRef} className="Messages flex-1 overflow-y-auto pb-2">
        {Array.isArray(messages) && messages.map((message:Message) => {
          if(user.id===message.sender.id){
            return <MyMessage key={message.id} message={message} />
          }else{
            return <OtherMessage key={message.id} message={message} />
          }
})}
      </div>
      {/* bottom */}
      <ChatInput chat={chat} />
    </div>
  );
}
