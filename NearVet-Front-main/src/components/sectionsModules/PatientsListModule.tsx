import React, { useEffect, useState } from "react";
import TableCustom from "../TableCustom";
import useLoading from "@/hooks/LoadingHook";
import Loading from "../Loading";
import { fetcher } from "@/lib/fetcher";
const PatientsListModule = () => {
  const URL_PATIENTS = process.env.NEXT_PUBLIC_URL_CLIENTES;
  const [patientsList, setPatientsList] = useState([]);
  const [page, setPage] = useState(1);
  const { loading, startLoading, stopLoading } = useLoading();
  useEffect(() => {
    fetchData();
  }, [page]);
  const fetchData = async () => {
    try {
      startLoading();
      const dataFetcher = {
        url: `${URL_PATIENTS}`,
        method: "GET" as const,
      };
      const response = await fetcher(dataFetcher);
      console.log(response);

      if (response.length > 0) {
        setPatientsList(response);
      }
    } finally {
      stopLoading();
    }
  };

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () =>
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  return (
    <section className="shadow-lg p-5 m-auto  text-center">
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

      {patientsList.length > 0 ? (
        <TableCustom
          title="Lista de Clientes"
          titulos={[
            "Cliente",
            "Cant. de Mascota",
            "Telefono",
            "Email",
            "Accion",
          ]}
          datos={patientsList}
        />
      ) : (
        <TableCustom
          title="Lista de Pacientes"
          titulos={["Mascota", "Dueño", "Telefono", "Email", "Accion"]}
        />
      )}
    </section>
  );
};

export default PatientsListModule;
