import React, { useEffect, useState } from "react";
import Link from "next/link";
import PATHROUTES from "@/helpers/path-routes";
import { useUser } from "@/context/UserContext";
import { fetchTurnosService } from "@/lib/Services/appointService";
import useLoading from "@/hooks/LoadingHook";
import Loading from "../Loading";
import { InfoNotify } from "@/lib/toastyfy";
const today = new Date();
const todayString = today.toISOString().split("T")[0];

export interface Turno {
  id: string;
  Subject: string;
  description: string;
  StartTime: string;
  EndTime: string;
  isAllDay: boolean;
  stateAppointment: string;
}
const AppointsVetModule = () => {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const { user } = useUser();
  const { loading, startLoading, stopLoading } = useLoading();
  useEffect(() => {
    const fetchTurnos = async () => {
      startLoading();
      if (!user?.id) return;
      try {
        const response = await fetchTurnosService(user.id, today, today);
        if (response.length > 0) {
          console.log(response);
          const turnosConFormato = response.map((turno: any) => ({
            ...turno,
            StartTime: formatTime(turno.StartTime),
            EndTime: formatTime(turno.EndTime),
          }));
          setTurnos(turnosConFormato);
        }
      } finally {
        stopLoading();
      }
    };
    if (user?.id) {
      fetchTurnos();
    }
  }, [user]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const handlePantalla = (idTurno: string) => {
    localStorage.setItem("turno", idTurno);
    InfoNotify(`Se llamo correctamente`);
  };
  return (
    <>
      <h3 className="text-xl text-detail">Atenciones del {todayString}</h3>
      {loading && <Loading />}

      <section className="flex flex-col md:flex-row flex-wrap m-auto w-full md:w-4/5 my-2 gap-2">
        {turnos &&
          turnos.map((turno) => (
            <article
              key={turno.id}
              className="flex flex-col p-5 m-auto md:w-2/6 border border-gray-300 gap-2 items-center cursor-default rounded-lg"
            >
              <h4 className="text-detail">{turno.Subject}</h4>
              <hr className="border-2 border-gray-400 w-full" />
              <p>
                Horario: {turno.StartTime} - {turno.EndTime}
              </p>
              <small>{turno.description}</small>

              {turno.stateAppointment === "Pendiente" ? (
                <div className="flex flex-row gap-2 justify evenly">
                  <button
                    className="bg-transparent p-2 m-auto rounded-lg shadow-lg"
                    onClick={() => handlePantalla(turno.id)}
                  >
                    Llamar por pantalla
                  </button>
                  <Link
                    href={`${PATHROUTES.PET}/AppointVet/${turno.id}`}
                    className="bg-detail p-2 m-auto rounded-lg text-white"
                  >
                    Iniciar turno
                  </Link>
                </div>
              ) : (
                <Link
                  href={`${PATHROUTES.PET}/AppointVet/${turno.id}`}
                  className="bg-transparent p-2 m-auto rounded-lg shadow-lg"
                >
                  Revisar Mascota
                </Link>
              )}
            </article>
          ))}
      </section>
      <button
        className="bg-transparent p-2 m-auto rounded-lg shadow-lg"
        onClick={() => localStorage.setItem("turno", "null")}
      >
        Limpiar Pantalla de llamado
      </button>
    </>
  );
};

export default AppointsVetModule;
