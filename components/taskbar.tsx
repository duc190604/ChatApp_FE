"use client";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { IoMdNotificationsOutline} from "react-icons/io";
import { IoChatbubbles, IoChatbubblesOutline, IoNotifications } from "react-icons/io5";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { FaRegUser, FaUser, FaUserPlus } from "react-icons/fa";
import { LuUserPlus } from "react-icons/lu";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Taskbar() {
  const [tab, setTab] = useState<string>("chat");
  const menuItems = [
    {
      name: "Chat",
      icon: <IoChatbubblesOutline size={30} className="text-gray-500" />,
      activeIcon: <IoChatbubbles size={30} className="text-blue-500" />,
      href: "/app/chats",
    },
    {
      name: "Friends",
      icon: <BsPeople size={30} className="text-gray-500" />,
      activeIcon: <BsPeopleFill size={30} className="text-blue-500" />,
      href: "/app/friends",
    },
    {
      name: "Notifications",
      icon: <IoMdNotificationsOutline size={30} className="text-gray-500" />,
      activeIcon: <IoNotifications size={30} className="text-blue-500" />,
      href: "/app/notifications",
    },
  ];
  const userItems = [
    {
      name: "Profile",
      icon: <FaRegUser size={30} className="text-gray-500" />,
      activeIcon: <FaUser size={30} className="text-blue-500" />,
      href: "/app/profile",
    },
  ];
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="h-full flex flex-col px-3 pt-[40px] border-r border-gray-200">
      {menuItems.map((item) => (
        <Link href={item.href} key={item.name}>
          <div className={`mt-5`}>
            {pathname.includes(item.href) ? item.activeIcon : item.icon}
          </div>
        </Link>
      ))}
      <div className="mt-auto mb-7">
        {userItems.map((item) => (
          <Link href={item.href} key={item.name}>
            {pathname === item.href ? item.activeIcon : item.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}
