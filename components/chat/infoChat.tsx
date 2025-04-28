"use client";
import { BsPersonCircle } from "react-icons/bs";
import { FaAngleRight, FaFileAlt, FaTrash } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Popup } from "../popupCustom";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { PopupImage } from "../popupImage";

export default function InfoChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMedia, setIsOpenMedia] = useState(false);
  const [urlMedia, setUrlMedia] = useState<string>('');
  const handleOpenMedia = (url: string) => {
    setUrlMedia(url);
    setIsOpenMedia(true);
  };
  return (
    <>
      <PopupImage
        urlMedia={urlMedia}
        isOpen={isOpenMedia}
        onClose={() => setIsOpenMedia(false)}
      />
      <div className="w-full h-full overflow-y-auto">
        <div className=" items-center justify-center flex flex-col bg-gray-100 pb-4">
          <img
            className="w-20 h-20 rounded-full mt-4"
            src="https://res.cloudinary.com/dq6kplkok/image/upload/v1741189481/chat-app/u0yomwtxhlr3urxgql8z.png"
            alt=""
          />
          <p className="text-lg font-medium font-inter mt-1">Nguyễn Văn A</p>
          <div className="flex items-center justify-center gap-5 mt-2">
            <div className="flex flex-col items-center justify-center group cursor-pointer">
              <div className="p-2 rounded-full bg-gray-200 group-hover:bg-gray-300 transition-all duration-200">
                <BsPersonCircle size={24} className="" />
              </div>
              <p className="text-xs font-light font-inter mt-1">Profile</p>
            </div>
            <div className="flex items-center justify-center flex-col group cursor-pointer">
              <div className="p-2 rounded-full bg-gray-200 group-hover:bg-gray-300 transition-all duration-200">
                <IoSearch size={24} className="" />
              </div>
              <p className="text-xs font-light font-inter mt-1">Search</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col px-4 mt-3">
          <div className="flex items-center justify-between w-full px-1 cursor-pointer hover:opacity-80 transition-all duration-200">
            <p className="text-base font-medium font-inter mt-0">Media</p>
            <FaAngleRight size={24} className="text-gray-500" />
          </div>

          <div className="grid grid-cols-3 grid-rows-2 gap-2">
            <img
              className="cursor-pointer hover:scale-95 transition-all duration-200 rounded-md mt-2 object-cover w-full h-full border-3 border-gray-300"
              onClick={() =>
                handleOpenMedia(
                  "https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/5/30/ba-na-hill-16854681479992103859126-0-0-731-1170-crop-168546817624789578898.jpg"
                )
              }
              src="https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/5/30/ba-na-hill-16854681479992103859126-0-0-731-1170-crop-168546817624789578898.jpg"
              alt=""
            />
            <img
              className="rounded-md mt-2 object-cover w-full h-full border-3 border-gray-300"
              src="https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/5/30/ba-na-hill-16854681479992103859126-0-0-731-1170-crop-168546817624789578898.jpg"
              alt=""
            />
            <img
              className="rounded-md mt-2 object-cover w-full h-full border-3 border-gray-300"
              src="https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/5/30/ba-na-hill-16854681479992103859126-0-0-731-1170-crop-168546817624789578898.jpg"
              alt=""
            />
            <img
              className="rounded-md mt-2 object-cover w-full h-full border-3 border-gray-300"
              src="https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/5/30/ba-na-hill-16854681479992103859126-0-0-731-1170-crop-168546817624789578898.jpg"
              alt=""
            />
            <img
              className="rounded-md mt-2 object-cover w-full h-full border-3 border-gray-300"
              src="https://res.cloudinary.com/dq6kplkok/image/upload/v1741189481/chat-app/u0yomwtxhlr3urxgql8z.png"
              alt=""
            />{" "}
            <img
              className="rounded-md mt-2 object-cover w-full h-full border-3 border-gray-300"
              src="https://res.cloudinary.com/dq6kplkok/image/upload/v1741189481/chat-app/u0yomwtxhlr3urxgql8z.png"
              alt=""
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between  px-4 mt-4  cursor-pointer hover:opacity-80 transition-all duration-200">
            <p className="text-base font-medium font-inter mt-1">Others file</p>
            <FaAngleRight size={24} className="text-gray-500" />
          </div>
          <div className="grid grid-cols-1 grid-rows-3 items-center justify-center flex-col px-4 mt-0">
            <div className="flex items-center gap-2 w-full border-b border-gray-200 py-[7px] cursor-pointer">
              <div className="bg-gray-200 rounded-sm p-[10px]">
                <FaFileAlt size={16} className="" />
              </div>
              <p className="text-base font-inter ml-[2px] w-full truncate text-ellipsis overflow-hidden ">
                hahahahahahah abba bs .docx
              </p>
            </div>
            <div className="flex items-center gap-2 w-full border-b border-gray-200 py-[7px] cursor-pointer">
              <div className="bg-gray-200 rounded-sm p-[10px]">
                <FaFileAlt size={16} className="" />
              </div>
              <p className="text-base font-inter  ml-[2px] w-full truncate text-ellipsis overflow-hidden ">
                hahahahahahah abba bs .docx
              </p>
            </div>

            <div className="flex items-center gap-2 w-full border-b border-gray-200 py-[7px] cursor-pointer">
              <div className="bg-gray-200 rounded-sm p-[10px]">
                <FaFileAlt size={16} className="" />
              </div>
              <p className="text-base font-inter  ml-[2px] w-full truncate text-ellipsis overflow-hidden ">
                hahahahahahah abba bs .docx
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center  px-4 mt-[10px] cursor-pointer hover:opacity-80 transition-all duration-200">
          <FaTrash size={18} className="text-red-500" />
          <p className="text-base text-red-500 font-inter ml-2">Delete all messages</p>
        </div>
      </div>
    </>
  );
}
