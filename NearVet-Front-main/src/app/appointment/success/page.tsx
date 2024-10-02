"use client";

import Screen from "@/components/Screen";
import { useUser } from "@/context/UserContext";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [seconds, setSeconds] = useState(5);
  const { user } = useUser();
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/userDashboard";
    }, 4000);
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);
  return (
    <Screen>
      <div className="shadow-lg rounded-lg p-6 m-auto">
        <h2 className="text-detail text-2xl my-4">
          Enhorabuena {user?.name}! Tu pago fue exitoso!
        </h2>
        <p>
          Vamos a redireccionarte en{" "}
          <strong className="text-green-600">{seconds}</strong>
        </p>
      </div>
    </Screen>
  );
};

export default Page;
