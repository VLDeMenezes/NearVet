"use client";

import Screen from "@/components/Screen";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [seconds, setSeconds] = useState(5);

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
          Ohh, que mal! Tu pago tuvo un error!
        </h2>
        <p>
          No te preocupes vamos a redireccionarte para que puedas intentarlo
          nuevamente <strong className="text-green-600">{seconds}</strong>
        </p>
      </div>
    </Screen>
  );
};

export default Page;
