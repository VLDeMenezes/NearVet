import { useUser } from "@/context/UserContext";
import PATHROUTES from "@/helpers/path-routes";
import { Turnos } from "@/types/interfaces";
import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io5";

interface TableCustomProps {
  title: string;
  titulos: string[];
  datos?: any[];
  isCancelable?: boolean;
  onClick?: (id: string) => Promise<any>;
}

const TableCustom: React.FC<TableCustomProps> = ({
  title,
  titulos,
  datos,
  isCancelable,
  onClick,
}) => {
  const { user } = useUser();

  const LinkWhatsapp = PATHROUTES.WHATSAPP;

  return (
    <div className="m-auto max-w-[95%] md:min-w-[80%] md:max-w-[80%] lg:min-w-[70%] lg:max-w-[70%]">
      <h2 className="text-xl italic my-4 font-semibold text-detail text-center">
        {title}
      </h2>

      <div className="hidden md:block">
        <table className="table w-full">
          <thead>
            <tr className="border border-gray-400">
              {titulos.map((titulo) => (
                <th key={titulo}>{titulo}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datos ? (
              datos.map((dato) => (
                <tr key={dato.id} className="border border-gray-400">
                  <td>{dato.name}</td>
                  {dato.pets ? (
                    <td>{dato.pets.length}</td>
                  ) : (
                    <td>Sin mascota</td>
                  )}
                  <td>{dato.phone}</td>
                  <td>{dato.email}</td>
                  <td className="flex flex-row items-center py-2 gap-2">
                    <Link
                      href={`${LinkWhatsapp}/${dato.phone}`}
                      aria-label="Boton para ir a whatsapp"
                      target="_blank"
                      className="rounded-full size-5 md:size-10 flex items-center justify-center text-white text-2xl bg-green-700 hover:scale-105"
                    >
                      <IoLogoWhatsapp />
                    </Link>
                    {user?.role.role === "adminVet" && (
                      <Link
                        href={`${PATHROUTES.NEW_CUPON}/${dato.id}`}
                        className="bg-detail p-1 rounded-lg text-white"
                      >
                        Nuevo Cupon
                      </Link>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <p>No hay datos</p>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Version */}
      <div className="block md:hidden">
        {datos &&
          datos.map((dato) => (
            <div
              key={dato.id}
              className="border-2 mb-4 p-4 rounded-lg shadow-sm"
            >
              <div className="flex justify-evenly">
                <span className="font-semibold">Fecha:</span>
                <span>{dato.mascota}</span>
              </div>
              <div className="flex justify-evenly">
                <span className="font-semibold">Hora:</span>
                <span>{dato.user}</span>
              </div>
              <div className="flex justify-evenly">
                <span className="font-semibold">Servicio:</span>
                <span>{dato.phone}</span>
              </div>
              <div className="flex justify-evenly">
                <span className="font-semibold">Estado:</span>
                <span>{dato.email}</span>
              </div>
              <div className="mt-4 flex gap-4 justify-evenly">
                <Link
                  href={LinkWhatsapp}
                  aria-label="Boton para ir a whatsapp"
                  target="_blank"
                  className="rounded-full w-12 h-12 flex items-center justify-center text-white text-2xl bg-green-700 hover:scale-105"
                >
                  <IoLogoWhatsapp />
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TableCustom;
