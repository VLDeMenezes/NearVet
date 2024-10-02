import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleButtonProps } from "@/types/interfaces";
import { signIn } from "next-auth/react";

const GoogleButton: React.FC<GoogleButtonProps> = ({
  text = "Iniciar con Google",
  size = "base",
  color = "black",
  bgcolor = "white",
}) => {
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await signIn("google", {
      callbackUrl: "/",
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:shadow-md text-${size} text-${color} bg-${bgcolor}`}
      aria-label={text}
    >
      <FcGoogle className="mr-2" size={24} />
      {text}
    </button>
  );
};

export default GoogleButton;
