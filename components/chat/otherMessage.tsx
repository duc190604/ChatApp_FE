import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { PopupImage } from "../popupImage";
import useClickOutside from "../../hooks/clickOutside";
import { Message } from "@/types/messages";
import React from "react";
import { LuFileText } from "react-icons/lu";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const OtherMessage = React.memo(({ message }: { message: Message }) => {
  const queryClient = useQueryClient();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenPopupImage, setIsOpenPopupImage] = useState(false);
  const [positionMenu, setPositionMenu] = useState<"top" | "bottom">("bottom");
  const ref = useClickOutside<HTMLDivElement>(() => setIsOpenMenu(false));
  const imageMessage = () => {
    if (message.type === "image") {
      return (
        <>
          <div
            className="w-[40%] h-[40%]"
            onClick={() => setIsOpenPopupImage(true)}
          >
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
    if (rect && rect.top > windowHeight - 300) {
      setPositionMenu("top");
    } else {
      setPositionMenu("bottom");
    }
    setIsOpenMenu(!isOpenMenu);
  };
  const deleteMessage = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/api/v1/message/${message.id}`);
    },
    onSuccess: () => {
      queryClient.setQueryData(["messages", message.chat], (old: Message[]) =>
        old.filter((msg) => msg.id !== message.id)
      );
      toast.success("Xóa tin nhắn thành công");
    },
    onError: () => {
      toast.error("Xóa tin nhắn thất bại");
    },
  });
  return (
    <div className=" relative w-[80%] flex items-center justify-start group mt-2 ml-2">
      <div className="min-w-10 min-h-10 mr-2">
        <img
          src={message.sender.avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
      <div className="">{imageMessage()}</div>

      {message.type === "text" && (
        <div className="w-fit py-2 px-3 bg-gray-100 rounded-3xl rounded-bl-sm rounded-tr-3xl">
          <p className="w-fit text-black">{message.content}</p>
        </div>
      )}
      {message.type === "file" && (
        <div className="ml-1 w-fit py-4 px-3 bg-gray-100 rounded-xl rounded-bl-sm rounded-tr-xl flex items-center gap-2">
          <LuFileText className="text-gray-500" size={30} />
          <p className="w-fit text-black font-medium">
            {message.content.split(";")[1]}
          </p>
        </div>
      )}
      <div
        ref={ref}
        className={`relative ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center ${
          isOpenMenu ? "opacity-100" : "opacity-0"
        }`}
      >
        {isOpenMenu && (
          <div className={` absolute ${positionMenu === "top" ? "bottom-7" : "top-7"} right-5 w-34 z-10  bg-white rounded-lg shadow-2xl border border-gray-200 p-2   flex flex-col`}>
            <p onClick={() => deleteMessage.mutate()} className=" cursor-pointer text-base font-medium text-slate-800 hover:bg-gray-100 rounded-md py-1 px-2 ">
              Xóa
            </p>
            <p className="cursor-pointer text-base font-medium text-slate-800 hover:bg-gray-100 rounded-md p-1">
              Ghim
            </p>
          </div>
        )}

        <BsThreeDotsVertical
          size={25}
          onClick={handleOpenMenu}
          className="text-gray-500 cursor-pointer hover:text-gray-700 hover:bg-gray-100 rounded-full p-1 active:scale-95 "
        />
        <p
          className="text-gray-400 font-light text-xs pointer-events-none"
          style={{ userSelect: "none" }}
        >
          {new Date(message.createdAt).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
});
export default OtherMessage;
