import React from "react";
import { SectionContentProps } from "@/types/interfaces";
import AppointsModule from "./appointsModule";
import PetsModule from "./petsModule";
import UserInformation from "./UserInformation";
import { ErrorNotify } from "@/lib/toastyfy";
import BillModule from "./BillModule";
import CalendarioModule from "./CalendarioModule";
import AppointsVetModule from "./AppointsVetModule";
import PatientsListModule from "./PatientsListModule";
import EmployeeList from "./Employee";
import VeterinaryInfo from "./VeterinaryInfo";
import Cupones from "./Cupones";
import VetInformation from "./VetInformation";

export const SectionContent: React.FC<SectionContentProps> = ({ section }) => {
  switch (section) {
    case "sinUser":
      return <p>No hay datos de usuario</p>;
    ///# Secciones User
    case "Ver mi Información":
      return <UserInformation />;
    case "Ver Mascotas":
      return <PetsModule />;
    case "Ver Turnos":
      return <AppointsModule />;
    case "Ver Facturas":
      return <BillModule />;
    case "Ver Veterinaria Favorita":
      return (
        <div>
          <h3 className="text-xl">Veterinaria Favorita</h3>
          <p>No tienes una veterinaria favorita</p>
          <button onClick={() => ErrorNotify("Funcionalidad no disponible")}>
            Cambiar
          </button>
        </div>
      );
    ///# Secciones Pets
    case "Vacunas":
      return <>Vacunas</>;
    case "Desparasitaciones":
      return <>Desparasitaciones</>;
    case "Enfermedades":
      return <>Enfermedades</>;
    case "Medicamentos":
      return <>Medicamentos</>;
    case "Visitas":
      return <>Visitas</>;
    ///# Secciones Admin
    case "Ver Cupones":
      return <Cupones />;
    case "Ver Empleados":
      return <EmployeeList />;
    case "Ver Veterinaria":
      return <VeterinaryInfo />;
    case "Ver clientes":
      return <PatientsListModule />;
    ///# Secciones Veterinario
    case "Ver Información":
      return <VetInformation />;
    case "Ver Calendario":
      return <CalendarioModule />;
    case "Atenciones pendientes":
      return <AppointsVetModule />;
    case "Lista de Pacientes":
      return <PatientsListModule />;
    default:
      return null;
  }
};

export default SectionContent;
