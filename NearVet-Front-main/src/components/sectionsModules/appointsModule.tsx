"use client";
import { Turnos } from "@/types/interfaces";
import { useEffect, useState } from "react";
import ButtonCustom from "../ButtonCustom";
import PATHROUTES from "@/helpers/path-routes";
import {
  cancelAppointController,
  fetchAppointController,
} from "@/lib/Controllers/appointController";
import useLoading from "@/hooks/LoadingHook";
import Loading from "../Loading";
import { useUser } from "@/context/UserContext";
import Screen from "../Screen";
import AppointCard from "../AppointCard";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AppointsModule: React.FC = () => {
  const [turnos, setTurnos] = useState<Turnos[]>([]);
  const { loading, startLoading, stopLoading } = useLoading();
  const [turnosFinalizados, setTurnoFinalizados] = useState<Turnos[]>([]);
  const [turnosPendientes, setTurnoPendientes] = useState<Turnos[]>([]);
  const [page, setPage] = useState(1);
  const { user } = useUser();

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        startLoading();
        const responseTurnos = await fetchAppointController(
          user?.id as string,
          user?.token as string,
          page
        );
        setTurnos(responseTurnos);
      } finally {
        stopLoading();
      }
    };
    if (user) {
      fetchTurnos();
    }
  }, [user, page]);

  useEffect(() => {
    if (turnos && turnos.length > 0) {
      const finalizados = turnos.filter(
        (turno) =>
          turno.state.state === "Finalizado" ||
          turno.state.state === "Cancelado"
      );
      const pendientes = turnos.filter(
        (turno) =>
          turno.state.state !== "Finalizado" &&
          turno.state.state !== "Cancelado"
      );

      setTurnoFinalizados(finalizados);
      setTurnoPendientes(pendientes);
    }
  }, [turnos]);

  const handleCancel = async (idTurno: string) => {
    try {
      startLoading();
      await cancelAppointController(
        user?.id as string,
        user?.token as string,
        idTurno
      );
      const newResponse = await fetchAppointController(
        user?.id as string,
        user?.token as string,
        page
      );
      setTurnos(newResponse);
    } finally {
      stopLoading();
    }
  };

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () =>
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));

  return (
    <Screen>
      <Link
        href={PATHROUTES.NEWAPPOINTMEN}
        className="mx-auto my-2 bg-detail text-white p-2 rounded-lg"
      >
        Agendar nuevo turno
      </Link>
      {loading && <Loading />}
      <div className="flex flex-row justify-evenly min-w-[80vw] mx-auto items-center">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`p-2 bg-detail text-white rounded-lg ${
            page === 1 ? "cursor-default opacity-0" : ""
          }`}
        >
          Anterior Página
        </button>
        <p className="text-2xl text-detail ">{page}</p>
        <button
          onClick={handleNextPage}
          className="p-2 bg-detail text-white rounded-lg"
        >
          Siguiente Página
        </button>
      </div>

      <>
        <section className="flex flex-col m-auto">
          <h3 className="text-2xl font-semibold italic mb-2 dark:text-darkHline">
            Turnos Activos
          </h3>

          {turnos && turnos.length > 0 && turnosPendientes.length > 0 ? (
            <div className="flex flex-row flex-wrap justify-items-center gap-2">
              {turnosPendientes.map((turno) => (
                <AppointCard
                  data={turno}
                  handleCancel={handleCancel}
                  key={turno.id}
                  isCancelable
                />
              ))}
            </div>
          ) : (
            <p>Sin turnos activos en esta pagina</p>
          )}
        </section>

        <hr className="border-2 my-10 mx-auto border-gray-400 w-2/3" />

        <section className="flex flex-col m-auto">
          <h3 className="text-2xl font-semibold italic mb-2 dark:text-darkHline">
            Turnos Finalizados
          </h3>
          {turnos.length > 0 && turnosFinalizados.length > 0 ? (
            <div className="flex flex-row flex-wrap justify-items-center gap-2">
              {turnosFinalizados.map((turno) => (
                <AppointCard
                  data={turno}
                  handleCancel={handleCancel}
                  key={turno.id}
                />
              ))}
            </div>
          ) : (
            <p>Sin turnos finalizados en esta pagina</p>
          )}
        </section>
      </>

      {turnos.length === 0 && <p>No hay turnos agendados</p>}
    </Screen>
  );
};

export default AppointsModule;
