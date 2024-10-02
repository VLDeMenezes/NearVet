"use client";
import Loading from "@/components/Loading";
import { useUser } from "@/context/UserContext";
import PATHROUTES from "@/helpers/path-routes";
import useLoading from "@/hooks/LoadingHook";
import { Mascota, Turnos } from "@/types/interfaces";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PetInfo from "../../[idPet]/petInfo";
import PetSection from "../../[idPet]/petSection";
import PetClinical from "../../[idPet]/PetClinical";
import ModalForm from "@/components/modalForm";
import { consulta, ErrorNotify } from "@/lib/toastyfy";
import {
  fetchAppointIdService,
  fetchFinishAppoint,
} from "@/lib/Services/appointService";

const PetIndividual: React.FC = () => {
  const [mascota, setMascota] = useState<Mascota>();
  const [turnoVet, setTurnoVet] = useState<Turnos | null>(null);
  const [turnoStatus, setTurnoStatus] = useState<
    "Pendiente" | "Finalizado" | "Cancelado" | null
  >(null);
  const { loading, startLoading, stopLoading } = useLoading();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const idUrl = useParams();
  const idAppoint = idUrl.idAppoint;
  const router = useRouter();

  useEffect(() => {
    if (idAppoint === "undefined") {
      router.push(PATHROUTES.USER_DASHBOARD);
      return;
    }
    startLoading();

    const fetchAppoint = async () => {
      try {
        const data = await fetchAppointIdService(idAppoint as string);
        if (data === undefined || data === null) {
          return;
        }

        setTurnoVet(data);
        setMascota(data.pet);
        if (data.state.state) {
          setTurnoStatus(data.state.state);
        }
      } finally {
        stopLoading();
      }
    };

    if (user?.role.role != "user" && idAppoint) {
      fetchAppoint();
    } else {
      ErrorNotify("No autorizado");
      return;
    }
  }, [user]);

  const handleCloseTurn = async () => {
    consulta("Finalizará el turno, ¿Desea continuar?", () => {
      fetchFinish();
    });
  };
  const fetchFinish = async () => {
    setTurnoStatus("Finalizado");
    try {
      startLoading();
      const data = await fetchFinishAppoint(turnoVet?.id as string);
    } finally {
      stopLoading();
      router.push(PATHROUTES.VET_DASHBOARD);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <ModalForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        setTurno={() => setTurnoStatus("Finalizado")}
        idPet={mascota?.id as string}
        idUser={user?.id as string}
        finish={fetchFinish}
      />
      {mascota && idAppoint && (
        <div className=" flex flex-col md:flex-row md:justify-evenly gap-1 my-2 md:m-auto">
          <div className="md:w-1/4">
            <PetInfo {...mascota} />
          </div>
          <div className="md:w-2/4">
            <PetSection idPet={mascota.id as string} />
          </div>
          <div className="md:w-1/4">
            <PetClinical idPet={mascota.id as string} pet={mascota} />
          </div>
          {turnoStatus === "Pendiente" && (
            <div className="fixed z-10 top-2 rigth-[50%] flex flex-row gap-2 shadow-md rounded-lg p-2">
              <button
                onClick={() => setIsOpen(true)}
                className=" bg-green-600 rounded p-2 text-white hover:scale-105"
              >
                Registrar turno
              </button>
              <button
                onClick={handleCloseTurn}
                className=" bg-red-500 rounded p-2 text-white hover:scale-105"
              >
                Finalizar turno
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PetIndividual;
