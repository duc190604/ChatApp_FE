import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useEffect } from "react";   
import { PopupImage } from "../popupImage";
import useClickOutside from "../../hooks/clickOutside";
import { Message } from "@/types/messages";
import React, { useRef } from "react";
import { LuFileText } from "react-icons/lu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance  from "@/lib/axiosInstance";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setEditMessage } from "@/redux/features/chatSlice";
import { RootState } from "@/redux/store";
const MyMessage = React.memo(({message}:{message:Message}) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { isEditMessage } = useSelector((state: RootState) => state.chat);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenPopupImage, setIsOpenPopupImage] = useState(false);
  const [positionMenu, setPositionMenu] = useState<"top" | "bottom">("bottom");
  const ref = useClickOutside<HTMLDivElement>(() => setIsOpenMenu(false));
  const [isEdit, setIsEdit] = useState(false);
  const imageMessage = () => {
    if(message.type === "image"){
    return (
      <>
        <div className="w-[40%] h-[40%]" onClick={() => setIsOpenPopupImage(true)}>
          <img
            src={message.content}
            alt="imageMessage"
            className="w-full h-full object-scale-down rounded-xl cursor-pointer"
          />
        </div>
        <PopupImage
          urlMedia={message.content}
          isOpen={isOpenPopupImage}
          onClose={() => setIsOpenPopupImage(false)}
        />
      </>
    );
    }
  };
  const handleOpenMenu = () => {
    const rect = ref.current?.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if(rect && rect.top > windowHeight-300){
      setPositionMenu("top");
    }else{
      setPositionMenu("bottom");
    }
    setIsOpenMenu(!isOpenMenu);
  }
  const deleteMessage = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/api/v1/message/${message.id}`);
    },
    onSuccess: () => {
      queryClient.setQueryData(["messages", message.chat], (old:Message[]) => old.filter((msg) => msg.id !== message.id));
      toast.success("Xóa tin nhắn thành công");
    },
    onError: () => {
      toast.error("Xóa tin nhắn thất bại");
    },
  });
  const revokeMessage = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/api/v1/message/${message.id}/revoke`);
    },
    onSuccess: () => {
      queryClient.setQueryData(["messages", message.chat], (old:Message[]) => old.map((msg) => msg.id === message.id ? {...msg, isRevoked: true} : msg));
      toast.success("Thu hồi tin nhắn thành công");
    },
    onError: () => {
      toast.error("Thu hồi tin nhắn thất bại");
    },
  });
  useEffect(() => {
    if(!isEditMessage && isEdit){
      setIsEdit(false);
    }
  }, [isEditMessage]);
  if(message.isRevoked){
    return (
      <div className="relative w-fit flex items-center justify-end group mt-2 pr-3 ml-auto">
        <p
          className="text-gray-400 font-light text-base pointer-events-none bg-gray-100 rounded-md p-2"
          style={{ userSelect: "none" }}
        >
          Tin nhắn đã bị thu hồi
        </p>
      </div>
    );
  }
  return (
    <div className=" relative w-[80%] flex items-center justify-end group mt-2 pr-3 ml-auto"> 
      <div
        ref={ref}
        className={` relative ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center ${
          isOpenMenu ? "opacity-100" : "opacity-0"
        }`}
      > 
        {isOpenMenu && (
          <div  className={` absolute ${positionMenu === "top" ? "bottom-7" : "top-7"} right-5 w-34 z-100  bg-white rounded-lg shadow-2xl border border-gray-200 p-2   flex flex-col`}>
            <p className=" cursor-pointer text-base font-medium text-slate-800 hover:bg-gray-100 rounded-md py-1 px-2 " onClick={() => deleteMessage.mutate()}>
              Xóa
            </p>
            <p className="cursor-pointer text-base font-medium text-slate-800 hover:bg-gray-100 rounded-md p-1" onClick={() => revokeMessage.mutate()}>
              Thu hồi
            </p>
            {message.type === "text" && (
              <p className="cursor-pointer text-base font-medium text-slate-800 hover:bg-gray-100 rounded-md p-1" onClick={() => {dispatch(setEditMessage({ isEditMessage: true, messageId: message.id, content: message.content })); setIsOpenMenu(false); setIsEdit(true);}}>
                Chỉnh sửa
              </p>
            )}
            <p className="cursor-pointer text-base font-medium text-slate-800 hover:bg-gray-100 rounded-md p-1">
              Ghim
            </p>
          </div>
        )}
        <p
          className="text-gray-400 font-light text-xs pointer-events-none"
          style={{ userSelect: "none" }}
        >
          {new Date(message.createdAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
        </p>
        <BsThreeDotsVertical
          size={25}
          onClick={handleOpenMenu}
          className="text-gray-500 cursor-pointer hover:text-gray-700 hover:bg-gray-100 rounded-full p-1 active:scale-95 "
        />
      </div>
      {imageMessage()}
      {message.type === "text" && (
        <div className={`ml-1 w-fit py-2 px-3 bg-blue-400 rounded-3xl rounded-br-sm rounded-tr-3xl ${isEdit ? "bg-gray-100 border-2 border-blue-400" : ""}`}>
          <p className={`w-fit ${isEdit ? "text-blue-400" : "text-white"}`}>{message.content}</p>
        </div>
      )}
      {message.type === "file" && (
        <div className="ml-1 w-fit py-4 px-3 bg-gray-100 rounded-xl rounded-br-sm rounded-tr-xl flex items-center gap-2">
          <LuFileText className="text-gray-500" size={30} />
          <p className="w-fit text-black font-medium">{message.content.split(";")[1]}</p>
        </div>
      )}
    </div>
  );
});
export default MyMessage;
