import useClickOutside from "@/hooks/clickOutside";
import axiosInstance from "@/lib/axiosInstance";
import uploadFile from "@/lib/uploadImage";
import { RootState } from "@/redux/store";
import { Chat } from "@/types/chat";
import { Message } from "@/types/messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import { FaRegFileLines } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdInsertEmoticon } from "react-icons/md";
import { RiAttachment2 } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setEditMessage } from "@/redux/features/chatSlice";

export default function ChatInput({ chat }: { chat: Chat }) {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const { isEditMessage , messageId, content } = useSelector((state: RootState) => state.chat);
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const [files, setFiles] = useState<File[]>([]);
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const pickerRef = useClickOutside<HTMLDivElement>(() =>
    setIsOpenEmoji(false)
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const mutation = useMutation({
    mutationFn: async ({
      content,
      type,
    }: {
      content: string;
      type: string;
    }) => {
      const response = await axiosInstance.post(`/api/v1/message`, {
        content: content,
        chat: chat.id,
        sender: user.id,
        type: type,
      });
      if (response.status === 201) {
        return response.data;
      }
    },
    onSuccess: (data) => {
      setMessage("");
      setFiles([]);
      queryClient.setQueryData(["messages", chat.id], (old: Message[]) => [
        ...old,
        data,
      ]);
    },
    onError: (error) => {
      toast.error("Failed to send message");
      // throw error
    },
  });
  const handleSendMessage = async () => {
    let filesToUpload = files;
    setFiles([]);
    let messageToSend = message;
    setMessage("");
    if (filesToUpload.length > 0) {
      const uploadPromises = filesToUpload.map(async (file) => {
        console.log(file);
        try {
          const res = await uploadFile(file);
          console.log(res);
          await mutation.mutate({
            content: `${res.url};${file.name}`,
            type: "file",
          });
          filesToUpload = filesToUpload.filter((f) => f !== file);
        } catch (error) {
          toast.error(`Failed to upload file ${file?.name}`);
        }
      });
      await Promise.all(uploadPromises);
    }
    if (messageToSend) {
      mutation.mutate({ content: messageToSend, type: "text" });
    }
  };
  const updateMessage = useMutation({
    mutationFn: async ({ content, messageId }: { content: string; messageId: string }) => {
      if(content === ""){
        toast.error("Message cannot be empty");
        return;
      }
      const response = await axiosInstance.put(`/api/v1/message/${messageId}`, { content });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["messages", chat.id], (old: Message[]) => old.map(message => message.id === messageId ? data : message));
      dispatch(setEditMessage({ isEditMessage: false, messageId: "", content: "" }));
    },
    onError: (error) => {
      toast.error("Failed to update message");
    },
  });
  useEffect(() => {
    localStorage.removeItem("reactEmojiPicker.recent");
  }, [isOpenEmoji]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files)); // Chuyển FileList thành mảng
    }
  };
  const handleRemoveFile = (file: File) => {
    setFiles(files.filter((f) => f !== file));
  };
  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (e.key === "Enter") {
  //       handleSendMessage();
  //     }
  //   };

  //   inputRef?.current?.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     inputRef?.current?.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [handleSendMessage]);
  if(isEditMessage)
    return (
      <div className="Input pt-2 shadow-lg border-t border-gray-300 bg-gray-50">
        <div className="flex items-center justify-between">
          <p className="text-blue-500 text-base font-medium ml-4 mb-2">Edit message</p>
          <IoClose
            onClick={() => dispatch(setEditMessage({ isEditMessage: false, messageId: "", content: "ab" }))}
            className="text-gray-500 cursor-pointer mr-2"
            size={24}
          />
        </div>
        <div className="flex bg-white items-center Input mt-auto mb-2 py-[6px]  rounded-2xl border border-gray-300 w-[95%] mx-auto">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type something..."
            className="w-full h-full outline-none px-4"
            value={content}
            onChange={(e) => dispatch(setEditMessage({ isEditMessage: true, messageId: messageId, content: e.target.value }))}
            onKeyDown={(e) => {
              if (e.key === "Enter") updateMessage.mutate({ content, messageId });
            }}
          />

          <div className="flex items-center gap-2 mr-4 relative">
            <div className="w-[1.5px] h-6 bg-gray-400"></div>
            <div className="cursor-pointer hover:bg-gray-100 rounded-full p-[6px]">
              <BsSend
                onClick={() => updateMessage.mutate({ content, messageId })}
                className="text-gray-500"
                size={20}
              />
            </div>
          </div>
        </div>
      </div>
    );
      
    
  return (
    <div className="Input mt-auto mb-2 py-[6px]  rounded-2xl border border-gray-300 w-[95%] mx-auto ">
      <div className="flex items-center  mx-3  overflow-x-auto">
        {files.map((file) => (
          <div
            key={file.name + file.lastModified}
            className="w-fit flex items-center gap-2 mr-2"
          >
            <div className="bg-gray-100 rounded-full p-2">
              <FaRegFileLines className="text-gray-500" size={24} />
            </div>
            <p className="text-base text-gray-500 font-inter -mt-1 ml-[2px] max-w-16 truncate text-ellipsis overflow-hidden ">
              {file.name}
            </p>
            <IoClose
              onClick={() => handleRemoveFile(file)}
              className="text-gray-500 cursor-pointer"
              size={24}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center w-full">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type something..."
          className="w-full h-full outline-none px-4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
        />

        <div className="flex items-center gap-2 mr-4 relative">
          <div className="cursor-pointer hover:bg-gray-100 rounded-full p-1">
            <MdInsertEmoticon
              className="text-gray-500 "
              size={24}
              onClick={() => setIsOpenEmoji(!isOpenEmoji)}
            />
          </div>

          {isOpenEmoji && (
            <div ref={pickerRef} className="absolute bottom-12 left-0 z-10">
              <EmojiPicker
                searchDisabled={false}
                previewConfig={{
                  showPreview: false,
                }}
                onEmojiClick={(emoji) => {
                  setMessage(message + emoji.emoji);
                }}
              />
            </div>
          )}
          <div className=" cursor-pointer hover:bg-gray-100 rounded-full p-1 relative">
            <RiAttachment2
              className="text-gray-500 pointer-events-none "
              size={24}
            />
            <input
              type="file"
              className=" absolute inset-0 opacity-0 w-6 h-6 hover:bg-gray-100 cursor-pointer z-10  "
              multiple
              onChange={handleFileChange}
            />
          </div>

          <div className="w-[1.5px] h-6 bg-gray-400"></div>
          <div className="cursor-pointer hover:bg-gray-100 rounded-full p-[6px]">
            <BsSend
              onClick={handleSendMessage}
              className="text-gray-500"
              size={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
