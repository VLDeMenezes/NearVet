"use client";
import ButtonCustom from "@/components/ButtonCustom";
import Loading from "@/components/Loading";

import Screen from "@/components/Screen";
import PATHROUTES from "@/helpers/path-routes";
import useLoading from "@/hooks/LoadingHook";
import { Veterinaria } from "@/types/interfaces";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const About = () => {
  const [vet, setVet] = useState<Veterinaria>();
  const { loading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const fetchActualData = async () => {
      try {
        startLoading();
        const responseAllVets = await fetch(
          `https://nearvet-latest.onrender.com/vets`
        );
        const response = await responseAllVets.json();
        let idVet = response[0].id;
        const responseVet = await fetch(
          `https://nearvet-latest.onrender.com/vets/${idVet}`
        );
        const data: Veterinaria = await responseVet.json();

        setVet(data);
      } finally {
        stopLoading();
      }
    };
    fetchActualData();
  }, []);

  return (
    <Screen>
      {loading && <Loading />}
      <h2 className="text-3xl text-detail">Sobre nosotros</h2>

      <p className="text-lightText dark:text-darkText w-2/3 mx-auto my-2 ">
        <strong>{vet?.name}</strong> es una aplicacion web destinada a que
        usuarios como vos puedan tener un claro seguimiento de la salud de su
        mascota, acceder a la historia clinica sin niguna complicacion, poder
        revisar las atenciones, recordar las recetas medicamentos o tratamientos
        que la veterinaria le haya indicado y que tu mascota debe recibir,
        tambien facilitar y asegurar turnos en la veterinaria con una atencion
        personalziada y rapida. Nuestro nombre corporativo es{" "}
        <strong>{vet?.nameCompany}</strong>, nuestro C.U.I.T es {vet?.cuit} y
        nuestro comienzo data de la fecha {vet?.startDate}
      </p>
      <div className="flex flex-col md:flex-row gap-2 justify-evenly w-full my-4">
        {vet && (
          <div className="flex flex-col">
            <h3 className="text-detail">Nuestra Ubicacion</h3>

            <div className="width: 100%">
              <iframe
                width="100%"
                height="300"
                className="border border-detail rounded-lg my-2"
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=Av.%20Corrientes%201234,%20Posadas+(NearVet)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              ></iframe>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2 ">
          <h3 className="text-detail">Nuestro Logo</h3>
          <Image
            src={vet?.imgBanner!}
            alt="Imagen banner"
            className="mx-auto  my-auto"
            width={150}
            height={150}
          />
        </div>
      </div>

      <ButtonCustom text="Tengo dudas" href={PATHROUTES.FAQ}></ButtonCustom>
    </Screen>
  );
};

export default About;
