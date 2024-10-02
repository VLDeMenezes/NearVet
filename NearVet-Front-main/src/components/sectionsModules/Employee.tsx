import { useUser } from "@/context/UserContext";
import PATHROUTES from "@/helpers/path-routes";
import { VeterinariesServices } from "@/lib/Services/userService";
import { Veterinario } from "@/types/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io5";
const LinkWhatsapp = PATHROUTES.WHATSAPP;
const EmployeeList: React.FC = () => {
  const { user } = useUser();
  const [veterinaries, setVeterinaries] = useState<Veterinario[]>([]);
  useEffect(() => {
    const fetchVeterinaries = async () => {
      const response = await VeterinariesServices();
      console.log(response);
      if (response.length > 0) {
        setVeterinaries(response);
      }
    };
    if (user) {
      fetchVeterinaries();
    }
  }, [user]);

  return (
    <section className="w-full md:w-2/3 my-5 mx-auto">
      <Link
        href={PATHROUTES.NEW_VET}
        className="bg-detail p-2 m-auto rounded-lg text-white hover:scale-105"
      >
        Agregar Nuevo Empleado
      </Link>
      <article className="flex flex-wrap gap-2 my-2">
        {veterinaries &&
          veterinaries.map((veterinary) => (
            <div
              className="w-1/3 rounded-lg shadow-lg m-auto flex flex-col gap-2 p-2 text-center items-center align-middle"
              key={veterinary.id}
            >
              <Image
                src={veterinary.user.imgProfile!}
                alt={veterinary.user.name!}
                width={100}
                height={100}
                className="rounded-2xl  p-1"
              />
              <p className="text-center text-xl text-detail">
                {veterinary.user.name} {veterinary.user.lastName}
              </p>
              <small>{veterinary.specialty}</small>
              <p>Licencia Nº {veterinary.licence}</p>
              <p>{veterinary.user.email}</p>
              <Link
                href={`${LinkWhatsapp}/${veterinary.user.phone}`}
                aria-label="Boton para ir a whatsapp"
                target="_blank"
                className="rounded-full size-5 md:size-10 flex items-center justify-center text-white text-2xl bg-green-700 hover:scale-105"
              >
                <IoLogoWhatsapp />
              </Link>
            </div>
          ))}
      </article>
    </section>
  );
};

export default EmployeeList;
