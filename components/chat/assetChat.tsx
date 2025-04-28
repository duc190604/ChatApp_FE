"use client";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { GoChevronLeft } from "react-icons/go";
import { TiArrowLeft } from "react-icons/ti";
import { PopupImage } from "@/components/popupImage";
import { FaRegFileLines } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";

export const AssetChat = () => {
  const [isMedia, setIsMedia] = useState(true);
  const [isOpenPopupImage, setIsOpenPopupImage] = useState(false);
  const [urlMedia, setUrlMedia] = useState("");
  const handleOpenPopupImage = async (url: string) => {
    setUrlMedia(url);
    setIsOpenPopupImage(true);
  };
  return (
    <div className="w-full h-full px-2 flex flex-col">
      <PopupImage
        urlMedia={urlMedia}
        isOpen={isOpenPopupImage}
        onClose={() => setIsOpenPopupImage(false)}
      />
      <div className="flex items-center mt-3">
        <div className="cursor-pointer hover:bg-gray-200 rounded-full p-1 transition-all duration-200">
          <TiArrowLeft size={24} className="cursor-pointer" />
        </div>
        <p className="text-lg font-medium font-inter ml-4">Media & Files</p>
      </div>
      <div className="flex items-center w-full mt-5 ml-2">
        <div
          className={` cursor-pointer w-fit px-4  ${
            isMedia
              ? "border-b-3 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setIsMedia(true)}
        >
          <p>Media</p>
        </div>
        <div
          className={`cursor-pointer w-fit px-4 ${
            isMedia
              ? "text-gray-500"
              : " border-b-3 border-blue-500 text-blue-500"
          }`}
          onClick={() => setIsMedia(false)}
        >
          <p>Files</p>
        </div>
      </div>
      {isMedia ? (
        <div className="grid grid-cols-3 gap-2 mt-3 px-2 overflow-y-auto py-2 pb-4">
          <img
            onClick={() =>
              handleOpenPopupImage(
                "https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/5/30/ba-na-hill-16854681479992103859126-0-0-731-1170-crop-168546817624789578898.jpg"
              )
            }
            className="cursor-pointer active:scale-98  rounded-md mt-2 object-cover w-full h-full border-2  border-gray-300"
            src="https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/5/30/ba-na-hill-16854681479992103859126-0-0-731-1170-crop-168546817624789578898.jpg"
            alt=""
            style={{
              aspectRatio: "1/1",
            }}
          />
          <img
            className="rounded-md mt-2 object-cover w-full h-full border-2  border-gray-300"
            src="https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/5/30/ba-na-hill-16854681479992103859126-0-0-731-1170-crop-168546817624789578898.jpg"
            alt=""
            style={{
              aspectRatio: "1/1",
            }}
          />
          <img
            className="rounded-md mt-2 object-cover w-full h-full border-2  border-gray-300"
            src="https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/5/30/ba-na-hill-16854681479992103859126-0-0-731-1170-crop-168546817624789578898.jpg"
            alt=""
            style={{
              aspectRatio: "1/1",
            }}
          />

          <img
            className="rounded-md mt-2 object-cover w-full h-full border-2  border-gray-300"
            src="https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/5/30/ba-na-hill-16854681479992103859126-0-0-731-1170-crop-168546817624789578898.jpg"
            alt=""
            style={{
              aspectRatio: "1/1",
            }}
          />
          <img
            className="rounded-md mt-2 object-cover w-full h-full border-2  border-gray-300"
            src="https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/5/30/ba-na-hill-16854681479992103859126-0-0-731-1170-crop-168546817624789578898.jpg"
            alt=""
            style={{
              aspectRatio: "1/1",
            }}
          />
          <img
            className="rounded-md mt-2 object-cover w-full h-full border-2  border-gray-300"
            src="https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/5/30/ba-na-hill-16854681479992103859126-0-0-731-1170-crop-168546817624789578898.jpg"
            alt=""
            style={{
              aspectRatio: "1/1",
            }}
          />
          <img
            className="rounded-md mt-2 object-cover w-full h-full border-2  border-gray-300"
            src="https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/5/30/ba-na-hill-16854681479992103859126-0-0-731-1170-crop-168546817624789578898.jpg"
            alt=""
            style={{
              aspectRatio: "1/1",
            }}
          />
          <img
            className="rounded-md mt-2 object-cover w-full h-full border-2  border-gray-300"
            src="https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/5/30/ba-na-hill-16854681479992103859126-0-0-731-1170-crop-168546817624789578898.jpg"
            alt=""
            style={{
              aspectRatio: "1/1",
            }}
          />
          <img
            className="rounded-md mt-2 object-cover w-full h-full border-2  border-gray-300"
            src="https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/5/30/ba-na-hill-16854681479992103859126-0-0-731-1170-crop-168546817624789578898.jpg"
            alt=""
            style={{
              aspectRatio: "1/1",
            }}
          />
          <img
            className="rounded-md mt-2 object-cover w-full h-full border-2  border-gray-300"
            src="https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/5/30/ba-na-hill-16854681479992103859126-0-0-731-1170-crop-168546817624789578898.jpg"
            alt=""
            style={{
              aspectRatio: "1/1",
            }}
          />
          <img
            className="rounded-md mt-2 object-cover w-full h-full border-2  border-gray-300"
            src="https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/5/30/ba-na-hill-16854681479992103859126-0-0-731-1170-crop-168546817624789578898.jpg"
            alt=""
            style={{
              aspectRatio: "1/1",
            }}
          />
          <img
            className="rounded-md mt-2 object-cover w-full h-full border-2  border-gray-300"
            src="https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/5/30/ba-na-hill-16854681479992103859126-0-0-731-1170-crop-168546817624789578898.jpg"
            alt=""
            style={{
              aspectRatio: "1/1",
            }}
          />
          <img
            className="rounded-md mt-2 object-cover w-full h-full border-2  border-gray-300"
            src="https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/5/30/ba-na-hill-16854681479992103859126-0-0-731-1170-crop-168546817624789578898.jpg"
            alt=""
            style={{
              aspectRatio: "1/1",
            }}
          />
          <img
            className="rounded-md mt-2 object-cover w-full h-full border-2  border-gray-300"
            src="https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/5/30/ba-na-hill-16854681479992103859126-0-0-731-1170-crop-168546817624789578898.jpg"
            alt=""
            style={{
              aspectRatio: "1/1",
            }}
          />
          <img
            className="rounded-md mt-2 object-cover w-full h-full border-2  border-gray-300"
            src="https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/5/30/ba-na-hill-16854681479992103859126-0-0-731-1170-crop-168546817624789578898.jpg"
            alt=""
            style={{
              aspectRatio: "1/1",
            }}
          />
          <img
            className="rounded-md mt-2 object-cover w-full h-full border-2  border-gray-300"
            src="https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/5/30/ba-na-hill-16854681479992103859126-0-0-731-1170-crop-168546817624789578898.jpg"
            alt=""
            style={{
              aspectRatio: "1/1",
            }}
          />
          <img
            className="rounded-md mt-2 object-cover w-full h-full border-2  border-gray-300"
            src="https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/5/30/ba-na-hill-16854681479992103859126-0-0-731-1170-crop-168546817624789578898.jpg"
            alt=""
            style={{
              aspectRatio: "1/1",
            }}
          />
          <img
            className="rounded-md mt-2 object-cover w-full h-full border-2  border-gray-300"
            src="https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/5/30/ba-na-hill-16854681479992103859126-0-0-731-1170-crop-168546817624789578898.jpg"
            alt=""
            style={{
              aspectRatio: "1/1",
            }}
          />
        </div>
      ) : (
        <div className="overflow-y-auto mt-3 pb-4">
          <div className="flex items-center gap-2 mx-4 border-b border-gray-200 pb-3 mt-3 cursor-pointer">
            <div className="bg-gray-200 rounded-sm p-3">
              <FaFileAlt size={16} className="" />
            </div>
            <p className="text-lg font-inter  ml-[2px] w-full truncate text-ellipsis overflow-hidden ">
              hahahahahahah abba bs .docx
            </p>
          </div>
          {Array.from({ length: 10 }).map((_, index) => (
            <div className="flex items-center gap-2 mx-4 border-b border-gray-200 pb-3 mt-3 cursor-pointer">
              <div className="bg-gray-200 rounded-sm p-3">
                <FaFileAlt size={16} className="" />
              </div>
              <p className="text-lg font-inter  ml-[2px] w-full truncate text-ellipsis overflow-hidden ">
                hahahahahahah abba bs .docx
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
