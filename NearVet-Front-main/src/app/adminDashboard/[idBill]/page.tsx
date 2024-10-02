"use client";
import Loading from "@/components/Loading";
import Screen from "@/components/Screen";
import { useUser } from "@/context/UserContext";
import PATHROUTES from "@/helpers/path-routes";
import useLoading from "@/hooks/LoadingHook";
import jsPDF from "jspdf";
import {
  BillEndController,
  BillModifyController,
} from "@/lib/Controllers/userController";
import { fetcher } from "@/lib/fetcher";
import { consulta, ErrorNotify, InfoNotify } from "@/lib/toastyfy";
import { Bill } from "@/types/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ImCoinDollar } from "react-icons/im";
import {
  IoCalendarClearOutline,
  IoCash,
  IoCashOutline,
  IoLogoWhatsapp,
  IoMail,
  IoMap,
  IoPhonePortrait,
} from "react-icons/io5";
const SALE_URL = process.env.NEXT_PUBLIC_SALE_URL;
const METHOD_PAY = process.env.NEXT_PUBLIC_METHOD_PAY;
const LinkWhatsapp = PATHROUTES.WHATSAPP;
const idBill: React.FC = () => {
  const id = useParams().idBill;

  const { loading, startLoading, stopLoading } = useLoading();
  const { user } = useUser();
  const [factura, setFactura] = useState<Bill>();
  const [discountMount, setDiscountMount] = useState(0);
  const [paySelect, setPaySelect] = useState("");
  const [payMethods, setPayMethods] =
    useState<{ id: string; method: string; interest: number }[]>();
  const router = useRouter();
  useEffect(() => {
    const fetchBill = async () => {
      if (!id) return;
      try {
        startLoading();
        const dataFetcher = {
          url: `${SALE_URL}/${id}`,
          method: "GET" as const,
        };
        const response = await fetcher(dataFetcher);
        setFactura(response);
        const payData = {
          url: `${METHOD_PAY}`,
          method: "GET" as const,
        };
        const responsePayMethod = await fetcher(payData);
        setPayMethods(responsePayMethod);
      } finally {
        stopLoading();
      }
    };
    if (user) {
      fetchBill();
    }
  }, [user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!paySelect) {
      ErrorNotify("Selecciona un metodo de pago");
      return;
    }
    const values = {
      discount: discountMount,
      methodPayId: paySelect,
      total: factura?.subtotal! - discountMount - factura?.advancedPay!,
    };
    if (values.total < 0) {
      ErrorNotify("El monto total debe ser mayor a 0");
      return;
    }
    consulta(
      "¿Estas seguro de cerrar la factura? A continuacion se descargará la misma",
      () => {
        generatePDF(factura!);
        CloseBill(values);
      },
      () => {
        return;
      }
    );
  };
  const CloseBill = async (values: any) => {
    try {
      startLoading();
      const responseBill = await BillModifyController(
        values,
        factura?.id as string
      );

      if (responseBill.id)
        setFactura((PrevFact: typeof factura) => ({
          ...PrevFact,
          ...responseBill,
        }));
    } finally {
      stopLoading();
      // router.push(PATHROUTES.ADMIN_DASHBOARD);
    }
  };
  const handlePrint = async () => {
    if (factura?.finished === false) {
      InfoNotify("La factura no ha sido cerrada");
      return;
    }
    generatePDF(factura!);
  };

  const generatePDF = (factura: Bill) => {
    const doc = new jsPDF();

    // Titulo de la factura
    doc.setFontSize(18);
    doc.text(`Factura Nº-${factura.id}`, 20, 20);

    // Datos del cliente
    doc.setFontSize(14);
    doc.text("Datos del cliente:", 20, 30);
    doc.setFontSize(12);
    doc.text(`Nombre: ${factura.user.name} ${factura.user.lastName}`, 20, 40);
    doc.text(`Email: ${factura.user.email}`, 20, 50);
    doc.text(
      `Dirección: ${factura.user.address}, ${factura.user.city}`,
      20,
      60
    );
    doc.text(`Teléfono: ${factura.user.phone}`, 20, 70);
    doc.line(10, 75, 200, 75);
    // Detalles de los productos
    doc.setFontSize(14);
    doc.text("Detalle de Productos:", 20, 80);
    factura.saleProducts.forEach((product, index) => {
      const yPosition = 90 + index * 10;
      doc.setFontSize(12);
      doc.text(
        `${product.product.name} - Precio: $${product.price} - Cantidad: ${product.acount}`,
        20,
        yPosition
      );
    });
    doc.line(10, 105, 200, 105);
    // Detalles de los servicios
    if (factura.saleServices.length > 0) {
      doc.setFontSize(14);
      doc.text("Detalle de Servicios:", 20, 110);
      factura.saleServices.forEach((service, index) => {
        const yPosition = 120 + index * 10;
        doc.setFontSize(12);
        doc.text(
          `${service.service.service} - Precio: $${service.price}`,
          20,
          yPosition
        );
      });
    }
    doc.line(10, 125, 200, 125);
    // Resumen de la factura
    const lastYPosition = 130 + factura.saleProducts.length * 10;
    doc.setFontSize(14);
    doc.text("Resumen de la Factura:", 20, lastYPosition + 10);
    doc.setFontSize(12);
    doc.text(`Subtotal: $${factura.subtotal}`, 20, lastYPosition + 20);
    doc.text(`Adelanto: $${factura.advancedPay}`, 20, lastYPosition + 30);
    doc.text(
      `Total: $${factura.subtotal - factura.advancedPay}`,
      20,
      lastYPosition + 40
    );
    doc.text("Gracias por su compra en NearVet", 50, 250);
    // Descargar PDF
    doc.save(`Factura-${factura.id}.pdf`);
  };

  return (
    <Screen>
      {loading && <Loading />}

      {factura && (
        <article className="shadow-lg rounded-lg p-4 flex flex-col gap-2 justify-center align-middle min-w-[80%] md:max-w-[80vw] mx-auto">
          <h2 className="Text-3xl text-detail">Facturacion Nº-{factura.id}</h2>
          <div className="flex flex-col p-4 gap-2  mx-auto border border-gray-400 rounded-lg min-w-[80%] max-w-[80%]">
            <h3 className="text-detail font-semibold">Datos del cliente:</h3>
            <div className="flex flex-row justify-between items-center gap-4 p-2">
              <div className="text-justify">
                <p className="text-lg text-detail text-center">
                  {factura.user.name} {factura.user.lastName}
                </p>
                <div className="flex flex-row items-center gap-2">
                  <IoMail />
                  <p> {factura.user.email}</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <IoMap />
                  <p>
                    {factura.user.address}, {factura.user.city}
                  </p>
                </div>

                <div className="flex flex-row items-center gap-2">
                  <IoPhonePortrait />
                  {factura.user.phone}
                  <Link
                    href={`${LinkWhatsapp}/${factura.user.phone}`}
                    aria-label="Boton para ir a whatsapp"
                    target="_blank"
                    className="rounded-full size-5 md:size-10 flex items-center justify-center text-white text-2xl bg-green-700 hover:scale-105"
                  >
                    <IoLogoWhatsapp />
                  </Link>
                </div>
              </div>
              <div>
                <Image
                  src={factura.user.imgProfile}
                  width={100}
                  height={100}
                  alt={`Foto de ${factura.user.name}`}
                  className="rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col p-4 gap-2  mx-auto border border-gray-400 rounded-lg min-w-[80%] max-w-[80%]">
            <h3 className="text-detail font-semibold">Detalle de Productos:</h3>
            {factura.saleProducts &&
              factura.saleProducts.map((product) => (
                <div
                  key={product.saleId}
                  className="flex flex-row gap-2 items-center justify-between md:justify-start"
                >
                  <p className="text-lg text-detail text-center">
                    {product.product.name}
                  </p>
                  <div className="flex flex-row items-center gap-1">
                    <ImCoinDollar />
                    <p>{product.price}</p>
                  </div>

                  <p>Cantidad: {product.acount}</p>
                </div>
              ))}
          </div>
          <div className="flex flex-col p-4 gap-2  mx-auto  border border-gray-400 rounded-lg min-w-[80%] max-w-[80%]">
            <h3 className="text-detail font-semibold">Detalle de Servicios:</h3>
            {factura.saleServices &&
              factura.saleServices.map((service) => (
                <div
                  key={service.saleId}
                  className="flex flex-row gap-2 items-center justify-between md:justify-start"
                >
                  <p className="text-lg text-detail text-center">
                    {service.service.service}
                  </p>
                  <div className="flex flex-row items-center gap-1">
                    <ImCoinDollar />
                    <p>{service.price}</p>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex flex-col p-4 gap-2  mx-auto border border-gray-400 rounded-lg min-w-[80%] max-w-[80%]">
            <h3 className="text-detail font-semibold">
              Informacion de la Factura
            </h3>
            <div className="flex flex-col md:flex-row justify-evenly gap-2 ">
              <div className="my-auto">
                <div className="flex flex-row gap-2 items-center">
                  <IoCalendarClearOutline />
                  <p className="text-lg">{factura.date}</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  Estado:
                  {factura.finished ? (
                    <p className="text-green-700 italic">Finalizada</p>
                  ) : (
                    <p>En proceso</p>
                  )}
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <IoCash />
                  <p>Subtotal: ${factura.subtotal}</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <IoCashOutline />
                  <p>Adelanto: ${factura.advancedPay}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-center">
                {factura.finished ? (
                  <>
                    <p>Descuento Aplicado: $ {factura.discount}</p>
                  </>
                ) : (
                  <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <label
                      htmlFor="discount"
                      className="block text-sm font-semibold text-detail m-1"
                    >
                      Aplicar Descuento en pesos:
                    </label>
                    <input
                      type="number"
                      id="discount"
                      name="discount"
                      placeholder="$100"
                      onChange={(event) =>
                        setDiscountMount(event.target.valueAsNumber)
                      }
                      className="w-full bg-transparent border-[.2em] border-1 placeholder:text-gray-400 dark:placeholder:text-gray-400 dark:text-white p-1 rounded-md text-center text-darkBorders"
                    />

                    <label
                      htmlFor="payMethod"
                      className="block text-sm font-semibold text-detail m-1"
                    >
                      Medio de pago:
                    </label>
                    <select
                      id="payMethod"
                      name="methodPayId"
                      onChange={(event) => setPaySelect(event.target.value)}
                      className="w-full bg-transparent border-[.2em] border-1 placeholder:text-gray-400 dark:placeholder:text-gray-400 dark:text-white p-1 rounded-md text-center text-darkBorders"
                    >
                      <option label="Seleccione una opción" />
                      {payMethods &&
                        payMethods.map((payMethod) => (
                          <option key={payMethod.id} value={payMethod.id}>
                            {payMethod.method}
                          </option>
                        ))}
                    </select>
                    <button
                      className="bg-detail text-white p-2 rounded-lg m-auto"
                      type="submit"
                    >
                      Aplicar
                    </button>
                  </form>
                )}
              </div>

              <p className="text-xl my-auto text-detail font-semibold">
                Total: $
                {factura && typeof factura.subtotal === "number"
                  ? factura.subtotal - factura.advancedPay - discountMount
                  : "N/A"}
              </p>
            </div>
            <button
              className="bg-detail text-white p-2 rounded-lg m-auto"
              onClick={handlePrint}
            >
              Imprimir Factura
            </button>
          </div>
        </article>
      )}
    </Screen>
  );
};

export default idBill;
