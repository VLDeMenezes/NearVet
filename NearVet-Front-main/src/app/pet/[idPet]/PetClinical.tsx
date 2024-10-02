import PATHROUTES from "@/helpers/path-routes";
import { TratmentsController } from "@/lib/Controllers/appointController";
import { fetchExistingPendients } from "@/lib/Services/appointService";
import {
  ClinicalExamination,
  Mascota,
  Pendiente,
  Tratamiento,
} from "@/types/interfaces";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

interface PetClinicaProps {
  idPet: string;
  pet?: Mascota;
}
const LOGO_URL = process.env.NEXT_PUBLIC_LOGO;
const PetClinical: React.FC<PetClinicaProps> = ({ idPet, pet }) => {
  const [Pendientes, setPendientes] = useState<Pendiente[]>([]);
  const [Historial, setHistorial] = useState<ClinicalExamination[]>([]);
  const [logoPag, setLogoPag] = useState<string>("");
  const { user } = useUser();
  useEffect(() => {
    const fetchLogo = async () => {
      const logo = await fetch(LOGO_URL as string);
      const logoText = await logo.text();
      setLogoPag(logoText);
    };
    if (idPet) {
      fetchLogo();
    }
  }, []);

  const handleDownloadPdf = (
    idPet: any,
    his: ClinicalExamination,
    logo: string,
    pet?: Mascota
  ) => {
    if (!idPet || !his || !pet || !logo) return;

    const doc = new jsPDF();
    doc.addImage(`${logo}`, "PNG", 10, 8, 40, 40);
    // Encabezado
    doc.setFontSize(16);
    doc.text("NearVet", 65, 20);
    doc.setFontSize(14);
    doc.text("Clínica de Pequeños Animales", 65, 30);
    doc.setFontSize(12);
    doc.text(
      "La misma reviste caracter provisorio y podria no contener",
      65,
      40
    );
    doc.text("todos los datos del Examen Clinico", 65, 45);

    // Línea separadora
    doc.setLineWidth(0.5);
    doc.line(10, 50, 200, 50);

    // Información de la mascota
    doc.text(`Fecha de descarga: ${new Date().toLocaleDateString()}`, 10, 60);
    doc.text(
      `Veterinario a cargo: ${his.veterinarian?.user.name} ${his.veterinarian?.user.lastName}`,
      120,
      60
    );
    doc.text(`Matricula Nº ${his.veterinarian?.licence}`, 120, 65);
    doc.setFontSize(16);
    doc.text(`Datos del paciente`, 10, 70);
    doc.setFontSize(12);
    doc.text(`Especie: ${pet.specie.specie}`, 10, 80);
    doc.text(`Raza: ${pet.race.race}`, 60, 80);
    doc.text(`Sexo: ${pet.sex.sex}`, 120, 80);
    doc.text(`Edad: ${calculateAge(pet.birthdate)}`, 10, 90);
    doc.text(`Color: ${pet.color}`, 60, 90);
    doc.text(`Nombre de la mascota: ${pet.name}`, 120, 90);

    // Motivo de consulta
    doc.setFontSize(12);
    const motivoConsultaLines = doc.splitTextToSize(his.anamnesis, 180); // El valor 180 es el ancho máximo en la página, ajústalo según necesites
    doc.text(motivoConsultaLines, 10, 100);

    // Parámetros clínicos en tabla
    doc.setFontSize(14);
    doc.text("Parámetros Clínicos:", 10, 120);
    doc.setFontSize(12);
    doc.text("Parámetro", 60, 130);
    doc.text("Valor", 100, 130);

    // Parámetros de la mascota
    doc.text("FC", 60, 150);
    doc.text(`${his.fc} lpm`, 100, 150);
    doc.text("FR", 60, 160);
    doc.text(`${his.fr} cpm`, 100, 160);
    doc.text("TLLC", 60, 170);
    doc.text(`${his.tllc} s`, 100, 170);
    doc.text("Temperatura", 60, 180);
    doc.text(`${his.temperature} °C`, 100, 180);
    doc.text("Hidratación", 60, 190);
    doc.text(`${his.hydration}%`, 100, 190);
    doc.text("Diagnostico", 60, 200);
    const diagnostico = doc.splitTextToSize(his.diagnosis, 180);
    doc.text(`${diagnostico}`, 60, 210);

    // if (his..length > 0) {
    //   currentY += 10; // Espacio entre las secciones
    //   doc.setFontSize(14);
    //   doc.text("Detalle de Servicios", 10, currentY);
    //   doc.setFontSize(12);
    //   doc.text("Descripción", 20, currentY + 10);
    //   doc.text("Cantidad", 90, currentY + 10);
    //   doc.text("Precio Unitario", 150, currentY + 10);

    //   currentY += 20;
    //   factura.saleServices.forEach((service) => {
    //     doc.text(`${service.service.service}`, 20, currentY);
    //     doc.text(`${service.acount}`, 90, currentY);
    //     doc.text(`$${service.price.toFixed(2)}`, 150, currentY);
    //     currentY += 10;
    //   });
    // }
    // Línea separadora final
    doc.setLineWidth(0.2);
    doc.line(10, 270, 200, 270);

    // Nota al pie
    doc.setFontSize(10);
    doc.text("Gracias por utilizar el servicio", 10, 280);
    doc.text("NearVet S.A.", 150, 280);

    // Descargar el PDF
    doc.save(`Historia_Clinica_${his.id}_${his.petId}.pdf`);
  };

  // Función auxiliar para calcular la edad
  const calculateAge = (birthdate: string) => {
    const birth = new Date(birthdate);
    const ageDifMs = Date.now() - birth.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  useEffect(() => {
    const fetchPendientes = async () => {
      const responsePendings = await fetchExistingPendients(idPet);

      if (responsePendings.length > 0) {
        setPendientes(responsePendings);
      }
    };
    const fetchHistorial = async () => {
      const responseHistorial = await TratmentsController(idPet);

      if (responseHistorial.length > 0) {
        const updatedHistorial = responseHistorial
          .filter(
            (tratamiento: Tratamiento) =>
              tratamiento.clinicalExamination?.petId === idPet
          )
          .map((tratamiento: Tratamiento) => tratamiento.clinicalExamination);

        setHistorial((prevHistorial) => [
          ...prevHistorial,
          ...updatedHistorial,
        ]);
      }
    };

    if (idPet) {
      fetchPendientes();
      fetchHistorial();
    }
  }, [idPet]);

  return (
    <section className=" flex flex-col shadow-lg md:min-h-[99vh]">
      <article className="flex flex-col min-h-[20vh] max-h-[30vh] m-2 p-2 gap-2 items-center overflow-y-scroll">
        <h3 className="text-xl text-detail">Pendientes</h3>

        {Pendientes.length > 0 ? (
          Pendientes.map((Pendiente) =>
            user?.role.role === "veterinarian" ? (
              <div className="p-2 shadow-lg flex flex-col cursor-default rounded-lg border border-red-400  text-center">
                {" "}
                <p className="italic text-detail">
                  {Pendiente.service.service}
                </p>
                <p>
                  Fecha:{" "}
                  {new Date(Pendiente.endPending).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
                <small>Descripcion: {Pendiente.description}</small>
              </div>
            ) : (
              <Link
                key={Pendiente.id}
                href={PATHROUTES.NEWAPPOINTMEN}
                className="p-2 shadow-lg flex flex-col cursor-pointer rounded-lg border border-red-400  text-center"
              >
                <p className="italic text-detail">
                  {Pendiente.service.service}
                </p>
                <p>
                  Fecha:{" "}
                  {new Date(Pendiente.endPending).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
                <small>Descripcion: {Pendiente.description}</small>
                <small>Click para reservar turno</small>
              </Link>
            )
          )
        ) : (
          <p className="text-center text-sm p-2">
            No hay atenciones pendientes
          </p>
        )}
      </article>
      <article className="max-h-[80vh] flex flex-col m-2 p-2 gap-2 items-center text-center overflow-y-scroll">
        <h3 className=" text-xl text-detail">Historial</h3>
        {Historial.length > 0 ? (
          Historial.map((his) => (
            <div
              key={his.id}
              className=" shadow-lg flex flex-col cursor-pointer rounded-lg hover:bg-slate-200 relative p-4"
              onClick={() => handleDownloadPdf(idPet, his, logoPag, pet)}
            >
              <small className="absolute top-0 right-2">
                Fecha: {new Date(his.date).toLocaleDateString()}
              </small>
              <p className="text-detail italic my-2">{his.anamnesis}</p>
              <p>Diagnostico: {his.diagnosis}</p>

              <small>Click para descargar</small>
            </div>
          ))
        ) : (
          <p>No hay visitas al veterinario todavia</p>
        )}
      </article>
    </section>
  );
};

export default PetClinical;
