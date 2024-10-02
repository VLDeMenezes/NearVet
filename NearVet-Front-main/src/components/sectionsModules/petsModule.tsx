"use client";
import CardCustom from "../cardCustom";
import Image from "next/image";
import PATHROUTES from "@/helpers/path-routes";
import { useEffect, useState } from "react";
import ButtonCustom from "../ButtonCustom";
import { ErrorNotify } from "@/lib/toastyfy";
import { useUser } from "@/context/UserContext";
import { Mascota } from "@/types/interfaces";
import { fetchPetsController } from "@/lib/Controllers/petController";
import useLoading from "@/hooks/LoadingHook";
import Loading from "../Loading";
import { useRouter } from "next/navigation";
import Screen from "../Screen";

const PetsModule: React.FC = () => {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const { loading, startLoading, stopLoading } = useLoading();
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const fetchMascota = async () => {
      try {
        const data = await fetchPetsController(
          user?.id as string,
          user?.token as string
        );
        if (data === undefined || data === null) {
          return;
        }
        const mascotasDisponibles = data.filter(
          (mascota: Mascota) => mascota.endDate === null
        );
        setMascotas(mascotasDisponibles);
      } finally {
        stopLoading();
      }
    };
    if (user?.id && user?.token) {
      startLoading();
      fetchMascota();
    }
  }, [user]);
  const handleClick = (id: string) => {
    router.push(PATHROUTES.PET + `/${id}`);
  };
  return (
    <Screen>
      {loading && <Loading />}
      <h3 className="text-2xl font-semibold dark:text-darkHline">
        Tus Mascotas
      </h3>
      <span className="text-gray-400 font-bold">_______________</span>

      <div className="flex flex-col md:flex-row md:flex-wrap gap-5 m-5 justify-center">
        {mascotas && mascotas.length === 0 ? (
          <p>Aún no tienes mascotas</p>
        ) : (
          mascotas &&
          mascotas.length > 0 &&
          mascotas.map((mascota) => (
            <CardCustom
              key={mascota.id}
              isSelect={"not"}
              onClick={() => handleClick(mascota.id)}
            >
              <div className="my-2">
                <Image
                  src={mascota.imgProfile}
                  alt={`Imagen de ${mascota.name}`}
                  width={100}
                  height={100}
                  className="mx-auto my-2 rounded-full p-1 bg-detail"
                />
                <h3 className="text-xl text-black dark:text-white mx-10">
                  Nombre: {mascota.name}
                </h3>
                <p className="text-black dark:text-white">
                  Raza: {mascota.race.race}
                </p>
                <p className="text-black dark:text-white">
                  Color: {mascota.color}
                </p>
              </div>

              <ButtonCustom
                text="Ver más"
                href={PATHROUTES.PET + `/${mascota.id}`}
              />
            </CardCustom>
          ))
        )}
      </div>
      <ButtonCustom text="Añadir mascota" href={PATHROUTES.PET + "/newpet"} />
    </Screen>
  );
};

export default PetsModule;
