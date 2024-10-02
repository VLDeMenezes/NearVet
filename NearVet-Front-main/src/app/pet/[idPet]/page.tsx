"use client";
import Loading from "@/components/Loading";
import { useUser } from "@/context/UserContext";
import { calculateAge } from "@/helpers/calcularEdad";
import PATHROUTES from "@/helpers/path-routes";
import useLoading from "@/hooks/LoadingHook";
import { fetchPetIdController } from "@/lib/Controllers/petController";
import { Mascota } from "@/types/interfaces";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PetInfo from "./petInfo";
import PetSection from "./petSection";
import PetClinical from "./PetClinical";

const PetIndividual: React.FC = () => {
  const [mascota, setMascota] = useState<Mascota>();
  const { loading, startLoading, stopLoading } = useLoading();
  const { user } = useUser();
  const idUrl = useParams();
  const router = useRouter();
  const idPet = idUrl.idPet;

  useEffect(() => {
    if (idUrl.idPet === "undefined") {
      router.push(PATHROUTES.USER_DASHBOARD);
      return;
    }

    const fetchMascota = async () => {
      startLoading();
      try {
        const data = await fetchPetIdController(
          idUrl.idPet as string,
          user?.token as string
        );

        if (data.birthdate != null) {
          const dataAndAge = { ...data, age: calculateAge(data.birthdate) };
          setMascota(dataAndAge);
        } else setMascota(data);
      } finally {
        stopLoading();
      }
    };
    if (user?.token) {
      fetchMascota();
    }
  }, [user]);

  return (
    <>
      {loading && <Loading />}
      {mascota && idUrl.idPet && (
        <div className=" flex flex-col md:flex-row md:justify-evenly gap-1 my-2 md:m-auto">
          <div className="md:w-1/4">
            <PetInfo {...mascota} idPet />
          </div>
          <div className="md:w-2/4">
            <PetSection idPet={idPet as string} />
          </div>
          <div className="md:w-1/4">
            <PetClinical idPet={idPet as string} pet={mascota} />
          </div>
        </div>
      )}
    </>
  );
};

export default PetIndividual;
