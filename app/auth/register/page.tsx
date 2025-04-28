"use client";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { BiUser } from "react-icons/bi";
import { FaGoogle, FaRegUser } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { RiLock2Line } from "react-icons/ri";
import { TbFileDescription, TbLockPassword } from "react-icons/tb";
import axios from "axios";
import Loading from "@/components/loading";
import { toast } from "sonner";
import uploadFile from "@/lib/uploadImage";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [info, setInfo] = useState({
    username: "",
    description: "",
    password: "",
    confirmPassword: "",
  });
  const { mutate: sendVerifyEmail } = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/email/send-verify-email`,
          {
            email,
          }
        );
        return response.data;
      } catch (error: any) {
        const errorData = error.response?.data;
        if (errorData.message) {
          toast.error(errorData.message || "Đã xảy ra lỗi");
          throw error;
        }
        toast.error("Đã xảy ra lỗi");
        throw error;
      }
    },
    onMutate: () => {
      setIsLoading(true);
      console.log("Đang gửi email xác thực...");
    },
    onError: (error) => {
      console.log("Lỗi khi gửi email:", error);
    },
    onSuccess: (data) => {
      console.log("Đã gửi email thành công:", data);
      setStep(2); // Tự động chuyển sang bước tiếp theo khi thành công
    },
    onSettled: () => {
      console.log("Đã hoàn thành việc gửi email");
      setIsLoading(false);
    },
  });
  const verifyEmail = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/email/verify-email`,
        {
          email,
          code,
        }
      );

      if (response.status === 200) {
        setToken(response.data.token);
        setStep(3);
      }
    } catch (error: any) {
      toast.error(error.response.data.message || "Đã xảy ra lỗi");
    } finally {
      setIsLoading(false);
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };
  const register = async () => {
    if (info.username === "") {
      toast.error("Tên tài khoản không được để trống");
      return;
    }
    if (info.password.length < 8) {
      toast.error("Mật khẩu phải có ít nhất 8 ký tự");
      return;
    }
    if (info.password !== info.confirmPassword) {
      toast.error("Mật khẩu không khớp");
      return;
    }
    let avatar = "";
    if (image) {
      const avatarResponse = await uploadFile(image);
      if (avatarResponse) {
        avatar = avatarResponse.url;
      }
    }
    setIsLoading(true);
    console.log(info);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/register`,
        {
          email,
          username: info.username,
          password: info.password,
          description: info.description,
          avatar: avatar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Đăng ký thành công");
        router.replace("/auth/login");
      }
    } catch (error: any) {
      if (error.response?.data.message) {
        toast.error(error.response?.data.message || "Đã xảy ra lỗi");
      } else {
        toast.error("Đã xảy ra lỗi");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Loading isLoading={isLoading} />
      <div className="bg-white w-[400px] py-5 rounded-lg shadow-lg my-auto border-1 border-gray-200">
        <div className="flex flex-col items-center h-full">
          {step !== 1 && (
            <IoArrowBack
              onClick={() => setStep(step - 1)}
              className="text-gray-400 mr-auto mb-[-20px] ml-5  hover:text-gray-500 transition-all duration-200 cursor-pointer"
              size={20}
            />
          )}
          <h1 className="text-3xl mx-auto text-black font-pomp">Register</h1>

          {step === 1 && (
            <div className="h-full w-full items-center justify-center flex flex-col ">
              <p className="text-gray-500 text-sm mt-0">
                We will send code to your email
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendVerifyEmail();
                }}
                className="flex flex-col  justify-center w-[80%] mt-2"
              >
                <p className="text-black text-sm ml-2">
                  Please enter your email
                </p>
                <div className="bg-[#edf2ff] w-full h-[50px] rounded-2xl mt-1 border-none flex items-center justify-center px-3">
                  <MdOutlineMail className="text-slate-700" size={28} />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-full rounded-2xl border-none text-black outline-none ml-2  font-light"
                  />
                </div>

                <button
                  type="submit"
                  className="mx-auto bg-blue-500 text-white  w-[100px]  h-[40px] rounded-2xl mt-4 border-none hover:bg-blue-600 transition-all duration-200 cursor-pointer active:scale-95"
                >
                  Next
                </button>
              </form>
              <p className="text-gray-500 text-sm mt-2">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-blue-500 hover:text-blue-600 active:scale-95 transition-all duration-200"
                >
                  Login
                </Link>
              </p>
            </div>
          )}
          {/* step2 */}
          {step === 2 && (
            <div className="h-full w-full items-center justify-center flex flex-col ">
              <p className="text-gray-500 text-sm mt-0">
                We sent code to your email
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  verifyEmail();
                }}
                className="flex flex-col  justify-center w-[80%] mt-2"
              >
                <p className="text-black text-sm ml-2">Please enter the code</p>
                <div className="bg-[#edf2ff] w-full h-[50px] rounded-2xl mt-1 border-none flex items-center justify-center px-3">
                  <TbLockPassword className="text-slate-700" size={28} />
                  <input
                    type="text"
                    placeholder="Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-full rounded-2xl border-none text-black outline-none ml-2  font-light"
                  />
                </div>

                <button
                  type="submit"
                  className="mx-auto bg-blue-500 text-white  w-[100px]  h-[40px] rounded-2xl mt-4 border-none hover:bg-blue-600 transition-all duration-200 cursor-pointer active:scale-95"
                >
                  Verify
                </button>
              </form>
              <p className="text-gray-500 text-sm mt-2">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-blue-500 hover:text-blue-600 active:scale-95 transition-all duration-200"
                >
                  Login
                </Link>
              </p>
            </div>
          )}
          {step === 3 && (
            <div className="h-full w-full items-center justify-center flex flex-col ">
              <p className="text-gray-500 text-sm mt-0">
                Please fill in the information
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  register();
                }}
                className="flex flex-col  justify-center w-[80%] mt-2"
              >
                <div className="flex items-center justify-center relative cursor-pointer w-[80px] h-[80px] mx-auto  ">
                  <img
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : "/images/default-avatar.jpg"
                    }
                    alt="avatar"
                    className="w-[80px] h-[80px] rounded-full object-cover mb-2 border-2 border-blue-300 p-[1px]"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className=" opacity-0 absolute inset-0 w-[80px] h-[80px] hover:bg-gray-100 cursor-pointer z-10  "
                    onChange={handleImageChange}
                  />
                </div>
                <div className="bg-[#edf2ff] w-full h-[50px] rounded-2xl mt-1 border-none flex items-center justify-center px-3">
                  <MdOutlineMail className="text-slate-700" size={28} />
                  <input
                    disabled
                    value={email}
                    placeholder="Email"
                    className="w-full h-full rounded-2xl border-none text-black outline-none ml-2  font-light"
                  />
                </div>
                <div className="bg-[#edf2ff] w-full h-[50px] rounded-2xl mt-4 border-none flex items-center justify-center px-3">
                  <BiUser className="text-slate-700" size={28} />
                  <input
                    type="text"
                    placeholder="Username"
                    value={info.username}
                    onChange={(e) =>
                      setInfo({ ...info, username: e.target.value })
                    }
                    className="w-full h-full rounded-2xl border-none text-black outline-none ml-2  font-light"
                  />
                </div>
                <div className="bg-[#edf2ff] w-full min-h-[50px] rounded-2xl mt-4 border-none flex items-center justify-center px-3">
                  <TbFileDescription className="text-slate-700" size={28} />
                  <textarea
                    placeholder="Description"
                    value={info.description}
                    onChange={(e) =>
                      setInfo({ ...info, description: e.target.value })
                    }
                    className="w-full h-full border-none text-black outline-none ml-2 my-1  font-light"
                    rows={1}
                  />
                </div>
                <div className="bg-[#edf2ff] w-full h-[50px] rounded-2xl mt-4 border-none flex items-center justify-center px-3">
                  <RiLock2Line className="text-slate-700" size={28} />
                  <input
                    type="password"
                    placeholder="Password"
                    value={info.password}
                    onChange={(e) =>
                      setInfo({ ...info, password: e.target.value })
                    }
                    className="w-full h-full rounded-2xl border-none text-black outline-none ml-2  font-light "
                  />
                </div>
                <div className="bg-[#edf2ff] w-full h-[50px] rounded-2xl mt-4 border-none flex items-center justify-center px-3">
                  <RiLock2Line className="text-slate-700" size={28} />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={info.confirmPassword}
                    onChange={(e) =>
                      setInfo({ ...info, confirmPassword: e.target.value })
                    }
                    className="w-full h-full rounded-2xl border-none text-black outline-none ml-2  font-light"
                  />
                </div>

                <button
                  type="submit"
                  className="mx-auto bg-blue-500 text-white  w-[100px]  h-[40px] rounded-2xl mt-4 border-none hover:bg-blue-600 transition-all duration-200 cursor-pointer active:scale-95"
                >
                  Create
                </button>
              </form>
              <p className="text-gray-500 text-sm mt-2">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-blue-500 hover:text-blue-600 active:scale-95 transition-all duration-200"
                >
                  Login
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
