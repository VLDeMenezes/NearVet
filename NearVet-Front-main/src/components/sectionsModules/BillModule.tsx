"use client";
import { useEffect, useState } from "react";
import { IoCutSharp, IoMedicalSharp } from "react-icons/io5";
import jsPDF from "jspdf";
import { useUser } from "@/context/UserContext";
import { BillsGeneralService, BillsService } from "@/lib/Services/userService";
import { Bill } from "@/types/interfaces";
import Loading from "../Loading";
import useLoading from "@/hooks/LoadingHook";
import { useRouter } from "next/navigation";
import PATHROUTES from "@/helpers/path-routes";
const LOGO_URL = process.env.NEXT_PUBLIC_LOGO;
const BillModule: React.FC = () => {
  const [facturas, setFacturas] = useState<Bill[]>([]);
  const [page, setPage] = useState(1);
  const [logoPag, setLogoPag] = useState<string>("");
  const { loading, startLoading, stopLoading } = useLoading();
  const [admin, setAdmin] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const startDay = new Date(user?.startDate as Date);
  const endDay = new Date();

  useEffect(() => {
    const fetchBills = async () => {
      if (!user) return;
      startLoading();
      try {
        const formattedStartDay = startDay.toISOString().split("T")[0];
        const formattedEndDay = endDay.toISOString().split("T")[0];
        if (user.role.role === "adminVet") {
          setAdmin(true);
          const responseBills = await BillsGeneralService();

          if (responseBills.length > 0) {
            setFacturas(responseBills);
          }
        } else {
          const responseBills = await BillsService(
            page,
            user.id as string,
            formattedStartDay,
            formattedEndDay
          );

          if (responseBills.length > 0) {
            setFacturas(responseBills);
          }
        }

        const logo = await fetch(LOGO_URL as string);
        const logoText = await logo.text();
        setLogoPag(logoText);
      } finally {
        stopLoading();
      }
    };

    if (user) {
      fetchBills();
    }
  }, [user, page]);

  const handleDownloadPdf = (factura: Bill, logo: string) => {
    const doc = new jsPDF();

    // Agregar el logo
    doc.addImage(`${logo}`, "PNG", 10, 10, 40, 40); // Posición x, y, width, height del logo

    // Encabezado de la factura
    doc.setFontSize(16);
    doc.text("NearVet", 75, 20);
    doc.setFontSize(12);
    doc.text("Dirección: Calle Falsa 123, Posadas.", 120, 20);
    doc.text("CUIL: 20-12345678-9", 60, 30);
    doc.text("Fecha Inicio de Actividad:", 60, 40);
    doc.text("01-01-2024", 70, 50);
    doc.text(`Fecha compra: ${factura.date}`, 120, 50);
    doc.text(`Nro de Transacción: ${factura.id}`, 120, 30);
    doc.text(
      `Consumidor: ${factura.user.name} ${factura.user.lastname}`,
      120,
      40
    );

    // Línea separadora
    doc.setLineWidth(0.5);
    doc.line(10, 60, 200, 60); // (x1, y1, x2, y2)

    // Información del cliente
    doc.setFontSize(14);
    doc.text("Datos del Cliente", 10, 70);
    doc.setFontSize(12);
    doc.text(`Nombre: ${factura.user.name} ${factura.user.lastname}`, 10, 80);
    if (factura.user.dni) doc.text(`DNI: ${factura.user.dni}`, 100, 80);
    if (factura.user.email) doc.text(`Email: ${factura.user.email}`, 10, 90);
    if (factura.user.phone)
      doc.text(`Teléfono: ${factura.user.phone}`, 100, 90);
    if (factura.user.address)
      doc.text(`Dirección: ${factura.user.address}`, 10, 100);
    if (factura.user.city) doc.text(`Ciudad: ${factura.user.city}`, 100, 100);

    // Línea separadora
    doc.line(10, 105, 200, 105);

    // Detalles de la factura
    doc.setFontSize(14);
    doc.text("Detalle de Productos", 10, 112);
    doc.setFontSize(12);
    doc.text("Descripción", 20, 120);
    doc.text("Cantidad", 90, 120);
    doc.text("Precio Unitario", 150, 120);

    let currentY = 130;
    factura.saleProducts.forEach((product) => {
      doc.text(`${product.product.name}`, 20, currentY);
      doc.text(`${product.acount}`, 90, currentY);
      doc.text(`$${product.price.toFixed(2)}`, 150, currentY);
      currentY += 10;
    });

    // Detalle de Servicios
    if (factura.saleServices.length > 0) {
      currentY += 10; // Espacio entre las secciones
      doc.setFontSize(14);
      doc.text("Detalle de Servicios", 10, currentY);
      doc.setFontSize(12);
      doc.text("Descripción", 20, currentY + 10);
      doc.text("Cantidad", 90, currentY + 10);
      doc.text("Precio Unitario", 150, currentY + 10);

      currentY += 20;
      factura.saleServices.forEach((service) => {
        doc.text(`${service.service.service}`, 20, currentY);
        doc.text(`${service.acount}`, 90, currentY);
        doc.text(`$${service.price.toFixed(2)}`, 150, currentY);
        currentY += 10;
      });
    }

    // Resumen de totales
    currentY += 5;
    doc.setLineWidth(0.5);
    doc.line(10, currentY, 200, currentY);
    currentY += 10;
    doc.text(`Subtotal: $${factura.subtotal.toFixed(2)}`, 150, currentY);
    currentY += 10;
    doc.text(`Descuento: $${factura.discount.toFixed(2)}`, 150, currentY);
    currentY += 10;
    doc.text(`Total: $${factura.total.toFixed(2)}`, 150, currentY);
    currentY += 10;
    if (factura.advancedPay > 0) {
      doc.text(
        `Pago adelantado: $${factura.advancedPay.toFixed(2)}`,
        150,
        currentY
      );
    }

    // Nota al pie
    doc.setFontSize(10);
    doc.text("Gracias por su compra, lo esperamos pronto.", 10, 270);
    doc.text("NearVet S.A.", 100, 270);

    // Descargar el PDF
    doc.save(`Factura_${factura.date}.pdf`);
  };

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () =>
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));

  return (
    <section className="flex flex-col w-2/3 m-auto shadow-lg">
      {loading && <Loading />}
      <div className="flex flex-row justify-around w-full m-auto">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`p-2 bg-detail text-white rounded-lg ${
            page === 1 ? "cursor-default opacity-0 " : ""
          }`}
        >
          Anterior Página
        </button>
        <p>{page}</p>
        <button
          onClick={handleNextPage}
          className="p-2 bg-detail text-white rounded-lg"
        >
          Siguiente Página
        </button>
      </div>
      <div className="flex flex-wrap gap-2 min-h-[80vh] ">
        {facturas && admin
          ? facturas.map((factura) => (
              <article
                key={factura.id}
                className="shadow-lg rounded-lg p-3 hover:scale-105 cursor-pointer m-auto relative flex flex-col gap-2 w-1/5"
                onClick={() => {
                  router.push(PATHROUTES.BILL + factura.id);
                }}
              >
                <small className="absolute italic top-2 right-3">
                  {factura.date}
                </small>
                <div className="flex flex-row justify-between gap-2 items-center mt-4">
                  <h4 className="text-xl text-detail">
                    Cliente: {factura.user.name}
                  </h4>
                </div>

                <div className="flex flex-row justify-between gap-2">
                  <p>Total</p>
                  <p>$ {factura.total}</p>
                </div>
                <div className="flex flex-row justify-evenly gap-2 items-center my-2">
                  <div className="text-detail">
                    {factura.finished ? "Finalizada" : "Pendiente"}
                  </div>
                </div>
                <div className="flex flex-col mt-1">
                  <small>Click para visualizarla</small>
                </div>
              </article>
            ))
          : facturas.map((factura, index) => (
              <article
                key={index}
                className="shadow-lg rounded-lg bg-slate-200 dark:bg-slate-700 p-4 hover:scale-105 cursor-pointer m-auto relative min-w-[20vw] "
                onClick={() => handleDownloadPdf(factura, logoPag)}
              >
                <p className="absolute top-1 right-1">{factura.date}</p>
                <div className="flex flex-row justify-between gap-2 items-start ">
                  <div>
                    <small>Servicios:</small>
                    <h4 className="text-lg font-semibold text-detail">
                      {factura.saleServices.map((service) => (
                        <p className="text-wrap">{service.service.service}</p>
                      ))}
                    </h4>
                  </div>
                  <div>
                    <small>Productos:</small>
                    <h4 className="text-lg font-semibold text-detail">
                      {factura.saleProducts.map((product) => (
                        <p className="text-wrap">{product.product.name}</p>
                      ))}
                    </h4>
                  </div>
                </div>
                <div className="flex flex-row justify-evenly gap-2 items-center my-2">
                  <div className="text-detail"></div>
                </div>
                <div className="flex flex-row justify-between gap-2">
                  <p>Subtotal:</p>
                  <p>{factura.subtotal}</p>
                </div>
                <div className="flex flex-row justify-between gap-2">
                  <p>Pagado:</p>
                  <p>{factura.advancedPay}</p>
                </div>

                <div className="flex flex-row justify-between gap-2">
                  <p className="text-detail text-lg">Saldo:</p>
                  <p className="text-detail text-lg">$ {factura.total}</p>
                </div>
                <div className="flex flex-col mt-1">
                  <small>Comprobante no válido como factura.</small>
                  <small>Para descargarla, haga click</small>
                </div>
              </article>
            ))}
      </div>
    </section>
  );
};

export default BillModule;
