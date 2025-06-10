"use client";
import { useStateContext } from "@/contexts/contextprovider";
import Button from "../utility/button";
import { loginGoogle, logout } from "@/lib/actions";
import Image from "next/image";
import Icon from "@/public/svg/svgicons";
import { useTransition } from "react";

type loggedInProps = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  visible: boolean;
};

export function LoggedIn({ name, email, image, visible }: loggedInProps) {
  const { userProfile, setUserProfile } = useStateContext();
  const [isPending, startTransition] = useTransition();
  return (
    <main
      className={`absolute bg-[#f0f0f0] dark:bg-[#0F1125] left-1/2 max-sm:left-1/3 -translate-x-1/2 max-sm:-translate-2/3 top-full mt-1 min-w-[210px] max-sm:min-w-[190px] min-h-[100px] rounded-[8px] px-4 py-5 transform transition-all duration-200 ease-out ${
        userProfile
          ? "opacity-100 transform-y-0 z-[100]"
          : "opacity-0 -translate-y-10 -z-[100]"
      } ${visible ? "block" : "hidden"}`}
    >
      <div className="flex justify-end w-full">
        <Icon noHover name="close" onClick={() => setUserProfile(false)} />
      </div>
      <div className="flex flex-col items-center gap-4">
        {image && (
          <Image
            src={image}
            alt="User Profile"
            width={50}
            height={50}
            className="w-[75px] max-md:w-[60px] rounded-full border-[3px] border-[#cbcbcb] dark:border-[#181C3A]"
          />
        )}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-xl max-sm:lg font-poppins font-semibold text-gray-800 dark:text-white">
            {name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-poppins max-sm:text-sm">
            {email}
          </p>
        </div>
        <Button
          bgColor="#FF0000"
          bgHover="#FF4747"
          scaleOnHover={false}
          loading={isPending}
          spinnerColor="white"
          onClick={() => startTransition(() => logout())}
        >
          Sign Out
        </Button>
      </div>
    </main>
  );
}

export function LoggedOut({ visible }: { visible: boolean }) {
  const { userProfile, setUserProfile } = useStateContext();
  const [isPending, startTransition] = useTransition();
  return (
    <main
      className={`absolute bg-[#f0f0f0] dark:bg-[#0F1125] left-1/2 max-sm:left-1/3 -translate-x-1/2 max-sm:-translate-2/3 top-full mt-1 min-w-[210px] max-sm:min-w-[190px] min-h-[100px] rounded-[8px] px-4 py-5 transform transition-all duration-200 ease-out ${
        userProfile
          ? "opacity-100 transform-y-0 z-[100]"
          : "opacity-0 -translate-y-10 -z-[100]"
      }  ${visible ? "block" : "hidden"}`}
    >
      <div className="flex justify-end w-full mb-[14px]">
        <Icon noHover name="close" onClick={() => setUserProfile(false)} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-lg max-sm:base font-poppins font-semibold text-gray-800 dark:text-white">
          Sign in with Google
        </h1>
        <Button
          type="outline"
          outLineColor="#4893d9"
          loading={isPending}
          className="flex items-center gap-2"
          onClick={() => startTransition(() => loginGoogle())}
        >
          <span>Sign In</span> <Google />
        </Button>
      </div>
    </main>
  );
}

const Google = () => (
  <svg
    width="22px"
    height="22px"
    viewBox="0 0 0.44 0.44"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="w-[20px] h-[20px]"
  >
    <path
      fill="#4285F4"
      d="M0.41 0.224 0.407 0.185H0.224v0.074h0.105a0.088 0.088 0 0 1 -0.039 0.058v0.048h0.063A0.187 0.187 0 0 0 0.41 0.223"
    />
    <path
      fill="#34A853"
      d="M0.224 0.413A0.187 0.187 0 0 0 0.353 0.366L0.29 0.318a0.11 0.11 0 0 1 -0.066 0.019 0.121 0.121 0 0 1 -0.109 -0.079H0.051v0.05a0.198 0.198 0 0 0 0.174 0.106"
    />
    <path
      fill="#FBBC04"
      d="M0.116 0.257a0.11 0.11 0 0 1 0 -0.074V0.133H0.051a0.187 0.187 0 0 0 0 0.173z"
    />
    <path
      fill="#EA4335"
      d="M0.224 0.103A0.11 0.11 0 0 1 0.299 0.132l0.055 -0.055A0.187 0.187 0 0 0 0.224 0.026 0.198 0.198 0 0 0 0.052 0.132l0.064 0.052A0.121 0.121 0 0 1 0.224 0.105z"
    />
  </svg>
);
