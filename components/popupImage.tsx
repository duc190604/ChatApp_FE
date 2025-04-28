import { useState } from "react";
import { IoMdClose } from "react-icons/io";
type Props = {
  urlMedia: string;
  isOpen: boolean;
  onClose: () => void;
};
export const PopupImage = ({ urlMedia, isOpen, onClose }: Props) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-100"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <div
        onClick={() => onClose()}
        className="absolute top-1 right-2 p-2 text-white cursor-pointer hover:opacity-80 transition-all duration-200"
      >
        <IoMdClose size={26} />
      </div>
      <div className="w-[80%] h-[80%]">
        <img src={urlMedia} alt="" className="w-full h-full object-contain" />
      </div>
    </div>
  );
};
