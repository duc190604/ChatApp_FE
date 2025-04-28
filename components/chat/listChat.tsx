"use client";
import { IoSearch } from "react-icons/io5";
import ChatItem from "./chatItem";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
export default function ListChat() {
  const [search, setSearch] = useState("");
  const [chats, setChats] = useState([]);
  const { data, isLoading, error } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/v1/chat");
      if (response.status === 200) {
        console.log("response.data",response.data);
        setChats(response.data);
        return response.data;
      }
      return []
    },
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if(data){
      const filteredChats = data.filter((chat: any) => chat.name.toLowerCase().includes(search.toLowerCase()));
      setChats(filteredChats);
    }
  }, [search, data]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  return (
    <div className="w-full h-full flex flex-col items-center border-r border-gray-200 shadow-lg px-4">
      <h1 className="text-2xl font-bold font-inter mt-3">Chat</h1>
      <div className=" mt-4 mb-4  w-full bg-gray-100 px-2 py-2 rounded-2xl flex items-center">
        <IoSearch size={24} className="text-gray-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className=" h-[20px] ml-2 outline-none text-base"
        />
      </div>
      {chats.length === 0 && <div className="text-center text-gray-500">No chats found</div>}
      {Array.isArray(chats) && chats?.map((chat: any) => (
        <ChatItem
          key={chat.id}
          name={chat.name}
          chatId={chat.id}
          lastMessageContent={chat.lastMessage.content}
          lastMessageTime={chat.lastMessage.updatedAt}
          avatar={chat.avatar}
          isOnline={chat.isOnline}
          isTyping={chat.isTyping}
          isRead={true}
        />
      ))}
    </div>
  );
}


