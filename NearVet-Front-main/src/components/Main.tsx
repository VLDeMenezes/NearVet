"use client";
import { FaGreaterThan } from "react-icons/fa";
import ButtonCustom from "./ButtonCustom";
import PATHROUTES from "@/helpers/path-routes";
import ServiceCard from "./ServiceCard";
import Title from "@/components/Title";
import { useEffect, useState } from "react";

import { fetcher } from "@/lib/fetcher";

import CategoryCard from "./CategoryCard";
import Link from "next/link";

const Main: React.FC = () => {
  const [category, setCategory] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const dataCategory = {
        url: "/category-services",
        method: "GET" as const,
      };
      const responseCategory: any = await fetcher(dataCategory);
      if (responseCategory) {
        console.log(responseCategory);
        setCategory(responseCategory);

        const fechtService = {
          url: `/services/category/${responseCategory[0].id}`,
          method: "GET" as const,
        };
        const responseServices = await fetcher(fechtService);
        console.log(responseServices);
        setServices(responseServices);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col w-full gap-16 dark:bg-gray-900 justify-center items-center">
      {/* Introducción */}
      <div className="flex flex-col lg:flex-row gap-12 md:gap-20 p-8 w-5/6 bg-purpleBackground dark:bg-darkBackgroundFront md:p-8 rounded-md shadow-md dark:border-darkBorders">
        <div className="w-full flex flex-col gap-4 lg:w-3/5">
          <Title>Cuidado experto para tu mascota</Title>
          <p className="text-justify text-base md:text-lg lg:text-xl dark:text-gray-200">
            Somos un equipo de profesionales apasionados y altamente
            capacitados, comprometidos a brindar el más alto nivel de cuidado y
            atención a tu compañero de cuatro patas.
          </p>
          <p className="text-justify text-base md:text-lg lg:text-xl dark:text-gray-200">
            Entendemos que tu{" "}
            <span className="text-detail font-bold dark:text-purple-300">
              amigo peludo
            </span>{" "}
            es una parte fundamental de tu familia, por lo que nos esforzamos en
            ofrecer servicios personalizados, pensados en su{" "}
            <span className="text-primary font-bold">bienestar </span> y{" "}
            <span className="text-primary font-bold">felicidad</span>.
          </p>
          <div className="flex justify-end mt-4">
            <ButtonCustom
              href={PATHROUTES.NEWAPPOINTMEN}
              text="Agenda tu cita"
              className="bg-secondary dark:bg-purple-800 dark:text-white hover:scale-105 dark:hover:bg-purple-700 md:p-2 lg:p-3"
            />
          </div>
        </div>
        <div className="flex items-center md:px-10">
          <img
            className="w-full h-auto lg:h-64 object-cover rounded-md shadow-lg dark:opacity-90"
            src="https://res.cloudinary.com/dvj0ded3x/image/upload/v1724516607/e-8_shgqns.png"
            alt="Veterinarian with pets"
          />
        </div>
      </div>
      {/* Nuestros Servicios */}
      <div className="flex flex-col gap-8 p-8 md:p-10 rounded-md w-5/6">
        <div className="flex justify-center">
          <Title>Servicios de Primera para tu Mejor Amigo</Title>
        </div>
        <p className="text-justify text-base md:text-lg lg:text-xl dark:text-gray-200 mx-auto mb-8">
          Explora nuestra amplia gama de servicios, cuidadosamente diseñados
          para garantizar la máxima comodidad y bienestar tanto para ti como
          para tu mascota. Ya sea que necesites un cuidado especializado, un
          servicio de rutina o algo más personalizado, nuestros profesionales se
          asegurarán de brindarte soluciones adaptadas a tus necesidades y a las
          de tu compañero peludo. Nos enorgullece ofrecer un entorno seguro y
          confiable, donde el bienestar de tu mascota es siempre nuestra
          prioridad.
        </p>
        <h3 className="text-2xl text-primary font-extrabold">Categorias:</h3>
        <div className="flex flex-row flex-wrap gap-8 md:gap-10 justify-center">
          {category &&
            category.map((category) => (
              <CategoryCard key={category.id} data={category} />
            ))}
        </div>
        <h3 className="text-2xl text-primary font-extrabold hidden md:block">
          Servicios:
        </h3>
        <div className=" flex-row flex-wrap gap-8 md:gap-10 justify-center hidden md:flex">
          {services &&
            services.map((service) => (
              <ServiceCard key={service.id} data={service} />
            ))}
        </div>
      </div>

      {/* Sobre nosotros */}
      <div className="bg-purpleBackground dark:bg-darkBackgroundFront p-8 md:p-8 rounded-md shadow-md mx-2 md:mx-6 dark:border-darkBorders w-5/6">
        <div className="w-5/6 mx-auto flex flex-col gap-5">
          <div className="flex flex-col items-center justify-center gap-5">
            <Title>Sobre Nosotros</Title>
            <p className="text-justify text-base md:text-lg lg:text-xl dark:text-gray-200 mb-8 w-full mx-auto">
              En NearVet, nos dedicamos a proporcionar el mejor cuidado posible
              para tus mascotas. Nuestro equipo de veterinarios experimentados
              está comprometido con la salud y el bienestar de tus compañeros
              peludos. Desde chequeos de rutina hasta cuidados especializados,
              descuida{" "}
              <span className="font-bold text-primary dark:text-green-400">
                ¡Te tenemos cubierto!
              </span>
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <div className="w-full lg:w-1/2">
              <ul className="space-y-8 md:space-y-4 lg:space-y-8">
                <li className="flex items-start">
                  <FaGreaterThan className="text-detail dark:text-purple-400 mt-1.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-detail text-start font-bold dark:text-purple-400 mb-2 pl-2 w-fit text-lg md:text-lg lg:text-xl">
                      Resuelve emergencias
                    </h3>
                    <p className="dark:text-gray-300 text-start text-sm md:text-base lg:text-lg">
                      Al cuidado de tu mascota 24/7.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FaGreaterThan className="text-detail dark:text-purple-400 mt-1.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-detail font-bold text-start dark:text-purple-400 mb-2 pl-2 w-fit text-lg md:text-lg lg:text-xl">
                      Agenda y gestiona tus citas
                    </h3>
                    <p className="dark:text-gray-300 text-start text-sm md:text-base lg:text-lg">
                      Cuida de tu mascota y gestiona sus citas médicas.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FaGreaterThan className="text-detail dark:text-purple-400 mt-1.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-detail font-bold text-start dark:text-purple-400 mb-2 pl-2 w-fit text-lg md:text-lg lg:text-xl">
                      Cuidado especializado
                    </h3>
                    <p className="dark:text-gray-300 text-start text-sm md:text-base lg:text-lg">
                      Accede a una amplia gama de servicios veterinarios para
                      las necesidades de tu mascota.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2">
              <img
                className="w-full rounded-md shadow-lg dark:opacity-90"
                src="https://res.cloudinary.com/dvj0ded3x/image/upload/v1724518723/How-to-become-a-vet_banner_xa9mlo.jpg"
                alt="Veterinarios atendiendo a un perro"
              />
            </div>
          </div>
          <Link
            href={PATHROUTES.ABOUTUS}
            className="bg-detail px-4 py-2 rounded-lg text-white m-auto hover:scale-105 duration-300"
          >
            Saber más
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
