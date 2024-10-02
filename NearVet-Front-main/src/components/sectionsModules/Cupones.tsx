import React, { useEffect, useState } from "react";
import Screen from "../Screen";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";
import PATHROUTES from "@/helpers/path-routes";
import Loading from "../Loading";
import useLoading from "@/hooks/LoadingHook";
export interface Cupon {
  code: string;
  valorPorc: number;
  used: boolean;
}
const CUPON_URL = process.env.NEXT_PUBLIC_CUPON_URL;
const Cupones = () => {
  const [cupones, setCupones] = useState<Cupon[]>([]);
  const { loading, startLoading, stopLoading } = useLoading();
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchCupones = async () => {
      try {
        startLoading();
        const DataFetch = {
          url: `${CUPON_URL}?page=${page}&limit=10`,
          method: "GET" as const,
        };
        const responseCupones = await fetcher(DataFetch);
        if (responseCupones.length > 0) setCupones(responseCupones);
      } finally {
        stopLoading();
      }
    };
    fetchCupones();
  }, [page]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () =>
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));

  return (
    <Screen>
      {loading && <Loading />}

      <h2 className="text-lg">Cupones existentes:</h2>
      <section className="shadow-lg rounded-lg flex flex-col md:w-2/3 gap-2 min-h-[80vh] items-center">
        <div className="flex flex-row justify-evenly gap-2 w-full items-center">
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
        <article className="p-2 flex flex-wrap gap-2">
          {cupones.length > 0 ? (
            cupones.map((cupon) => {
              return (
                <div
                  key={cupon.code}
                  className="shadow-lg rounded-lg p-4 mx-auto flex flex-col gap-4 min-w-[20vw] max-w-[20vw] hover:scale-105"
                >
                  <p className="text-lg text-detail italic">{cupon.code}</p>
                  <p className="text-green-600"> {cupon.valorPorc} %</p>
                  <p>{cupon.used ? "Usado" : "No usado"}</p>
                </div>
              );
            })
          ) : (
            <p className="text-lg text-center text-detail font-semibold">
              No hay cupones todavia
            </p>
          )}
          {cupones.length > 10 && (
            <p className="text-center italic">
              Hay mas cupones en la proxima página
            </p>
          )}
        </article>
      </section>
    </Screen>
  );
};

export default Cupones;
