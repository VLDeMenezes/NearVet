"use client";

import type {} from "ldrs";
import { useEffect } from "react";

const Loading: React.FC = () => {
  useEffect(() => {
    async function getLoader() {
      const { cardio } = await import("ldrs");
      cardio.register();
    }
    getLoader();
  }, []);

  return (
    <main className="fixed top-0 left-0 z-20 bg-black bg-opacity-70 h-screen w-screen items-center justify-center flex">
      <div className="bg-opacity-60 p-10 rounded-lg flex flex-col items-center relative">
        <div className="fixed mx-auto top-[30lvh]">
          <l-cardio size="100" stroke="4" speed="2" color="violet"></l-cardio>
        </div>
      </div>
    </main>
  );
};

export default Loading;
