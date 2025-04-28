"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { RiLock2Line } from "react-icons/ri";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import Loading from "@/components/loading";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const login = async () => {
    setIsLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setIsLoading(false);
    if (res?.error) {
      toast.error(res?.error);
    } else {
      toast.success("Đăng nhập thành công");
      router.replace("/app/chats");
    }
    
  };
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Loading isLoading={isLoading} />
      <div className="bg-white w-[400px] h-[500px] rounded-lg shadow-lg my-auto border-1 border-gray-200">
        <div className="flex flex-col items-center h-full">
          <h1 className="text-3xl text-black mt-4 font-pomp">Login</h1>
          <p className="text-gray-500 text-sm">Please access your account</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
            className="flex flex-col items-center justify-center w-[80%]"
          >
            <div className="bg-[#edf2ff] w-full h-[50px] rounded-2xl mt-3 border-none flex items-center justify-center px-3">
              <MdOutlineMail className="text-slate-700" size={28} />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="w-full h-full rounded-2xl border-none text-black outline-none ml-2  font-light"
              />
            </div>

            <div className="bg-[#edf2ff] w-full h-[50px] rounded-2xl mt-5 border-none flex items-center justify-center px-3">
              <RiLock2Line className="text-slate-700" size={28} />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="w-full h-full rounded-2xl border-none text-black outline-none ml-2"
              />
            </div>
            <Link
              href="/auth/forgotPassword"
              className="text-gray-500 text-[12px] ml-auto mr-2 mt-1 cursor-pointer hover:text-gray-400"
            >
              Forgot your password ?
            </Link>
            <button className="bg-blue-500 text-white  w-[100px]  h-[40px] rounded-2xl mt-4 border-none hover:bg-blue-600 transition-all duration-200 cursor-pointer active:scale-95">
              Login
            </button>
          </form>
          <div className="flex items-center justify-center mt-4">
            <p className="text-gray-500 text-[12px]">Don't have an account ?</p>
            <Link
              href="/auth/register"
              className="text-blue-500 text-[12px] ml-1 cursor-pointer hover:text-blue-400"
            >
              Sign up
            </Link>
          </div>
          <div className="flex items-center justify-center mt-4">
            <div className="w-[100px] h-[1px] bg-gray-200"></div>
            <p className="text-gray-500 text-[12px] mx-2">Or</p>
            <div className="w-[100px] h-[1px] bg-gray-200"></div>
          </div>
          <div className=" items-center justify-center w-[80%]">
            <div className=" cursor-pointer hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 border border-gray-200  w-full h-[50px] rounded-2xl mt-2 flex items-center justify-center  px-3">
              <img
                src="/images/logo_google.png"
                alt="google"
                className="w-6 h-6"
              />
              <p className="text-gray-500 text-[12px] ml-2">
                Login with Google
              </p>
            </div>
            <div className=" cursor-pointer hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 border border-gray-200  w-full h-[50px] rounded-2xl mt-3 flex items-center justify-center  px-3">
              <img
                src="/images/logo_facebook.png"
                alt="facebook"
                className="w-6 h-6"
              />
              <p className="text-gray-500 text-[12px] ml-2">
                Login with Facebook
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
