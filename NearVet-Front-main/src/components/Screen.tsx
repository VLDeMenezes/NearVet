"use client";
import { ScreenProps } from "@/types/interfaces";
const Screen: React.FC<ScreenProps> = ({ children }) => {
  return (
    <main
      className={`w-full lg:w-full flex flex-col mx-auto min-h-[100lvh] items-center text-center dark:bg-darkBackground py-16`}
    >
      {children}
    </main>
  );
};

export default Screen;
