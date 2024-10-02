import { useUser } from "@/context/UserContext";
import PATHROUTES from "@/helpers/path-routes";
import Image from "next/image";
import Link from "next/link";
import {
  IoCalendarClearOutline,
  IoLogoWhatsapp,
  IoTimeOutline,
} from "react-icons/io5";
import { Turno } from "./sectionsModules/AppointsVetModule";
import { Turnos } from "@/types/interfaces";

interface AppointCardProps {
  data: Turnos;
  handleCancel?: (id: string) => Promise<any>;
  isCancelable?: boolean;
}

const AppointCard: React.FC<AppointCardProps> = ({
  handleCancel,
  data,
  isCancelable,
}) => {
  const { user } = useUser();
  const LinkWhatsapp = `${PATHROUTES.WHATSAPP}/3758488428?text=Hola,%20soy%20${user?.name}%20y%20me%20gustaria%20consultar%20respecto%20un%20turno`;

  const whatDayIs = (day: string): string => {
    const date = new Date(day);
    const daysOfWeek = [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  };

  const result = whatDayIs(data?.date);
  return (
    <>
      {data && (
        <article
          id="card"
          className="flex flex-col p-5 m-auto border-gray-300 shadow-md gap-2 items-center cursor-default rounded-lg hover:scale-105"
        >
          <h3 className="text-xl font-semibold text-detail">
            {data.service.service}
          </h3>
          <hr className="border-2 border-gray-400 w-full" />
          <div className="flex flex-row gap-2 items-start">
            <div className="flex flex-col gap-1 items-center">
              <p className="flex flex-row items-center gap-1">
                <IoCalendarClearOutline />

                {result}
              </p>
              <p className="text-xs">{data.date}</p>
            </div>
            <p className="text-detail flex flex-row items-center">
              <IoTimeOutline />
              {data.time} hs
            </p>
          </div>
          <div className="items-center">
            <Image
              src={data.pet.imgProfile}
              alt="Imagen de Mascota"
              width={150}
              height={150}
              className="rounded-full object-cover w-24 h-24 p-1 bg-detail"
            />
            <h4 className="text-detail uppercase font-semibold">
              {data.pet.name}
            </h4>
          </div>
          <div className="flex flex-row justify-around gap-2">
            {isCancelable ? (
              <>
                <Link
                  aria-label="Boton para ir a whatsapp"
                  href={LinkWhatsapp}
                  target="_blank"
                  className="rounded-full size-5 md:size-10 flex items-center justify-center text-white text-2xl bg-green-700 hover:scale-105"
                >
                  <IoLogoWhatsapp />
                </Link>
                <button
                  aria-label="Boton para cancelar turno"
                  onClick={() => {
                    handleCancel && handleCancel(data.id);
                  }}
                  className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-700 hover:scale-105"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <div className="flex flex-col">
                <small className="text-red-500 text-xs py-1">
                  {data.state.state === "Cancelado"
                    ? "Cancelado"
                    : "Finalizado"}
                </small>
                {data.state.state === "Finalizado" && (
                  <Link
                    aria-label="Boton para calificar atención"
                    className="p-2 m-auto rounded-lg bg-detail  text-white hover:bg-detail  hover:scale-105 "
                    href={PATHROUTES.CALIFICAR}
                    target="_blank"
                  >
                    Calificar Servicio
                  </Link>
                )}
              </div>
            )}
          </div>
        </article>
      )}
    </>
  );
};

export default AppointCard;
