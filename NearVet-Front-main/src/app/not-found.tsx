"use client";
import Title from "@/components/Title";
import React, { useEffect, useState } from "react";
import Screen from "@/components/Screen";
import PATHROUTES from "@/helpers/path-routes";
import Image from "next/image";

const NotFound: React.FC = () => {
  const [seconds, setSeconds] = useState(5); // Estado para el tiempo restante

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/"; // Redirige a la página de inicio
    }, 5000); // Redirección después de 5 segundos

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1); // Decrementa el tiempo restante cada segundo
    }, 1000); // Actualiza cada segundo

    return () => {
      clearTimeout(timer); // Limpia el temporizador de redirección
      clearInterval(interval); // Limpia el intervalo
    };
  }, []);
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[75vh] gap-2">
      <div className="text-5xl font-bold text-detail text-center self-center flex items-center">
        <Image
          src="/logo.svg"
          alt="Logo Nearvet"
          width={64}
          height={64}
          priority
        />
        NearVet
      </div>
      <div className="flex gap-2">
        <span className="text-primary font-bold text-2xl md:text-3xl lg:text-4xl dark:text-white">
          ¡Ooops!
        </span>
        <Title>Página no encontrada</Title>
      </div>
      <p className="text-gray-600 font-bold">
        Redireccionando a Inicio en {seconds} segundos...
      </p>
    </div>
  );
};

export default NotFound;
