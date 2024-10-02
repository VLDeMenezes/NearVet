import {
  EmployeeIcon,
  InformationIcon,
  MedicalIcon,
  PawIcon,
  StoreIcon,
  TicketIcon,
} from "@/lib/icons";
import { UserCard } from "@/types/interfaces";

export const userCards: UserCard[] = [
  {
    text: "Ver mi Información",
    icon: <InformationIcon size="2xl" />,
  },
  {
    text: "Ver Mascotas",
    icon: <PawIcon size="2xl" />,
  },
  {
    text: "Ver Turnos",
    icon: <MedicalIcon size="2xl" />,
  },
  {
    text: "Ver Facturas",
    icon: <TicketIcon size="2xl" />,
  },
  // {
  //   text: "Veterinaria Favorita",
  //   icon: <StoreIcon size="2xl" />,
  // }
];

export const userPetsCards: UserCard[] = [
  {
    text: "Vacunas",
    icon: <InformationIcon size="2xl" />,
  },
  {
    text: "Desparasitaciones",
    icon: <MedicalIcon size="2xl" />,
  },
  {
    text: "Enfermedades",
    icon: <MedicalIcon size="2xl" />,
  },
  {
    text: "Medicamentos",
    icon: <MedicalIcon size="2xl" />,
  },
  {
    text: "Visitas",
    icon: <MedicalIcon size="2xl" />,
  },
];
export const adminCards: UserCard[] = [
  {
    text: "Ver mi Información",
    icon: <InformationIcon size="2xl" />,
  },
  {
    text: "Ver Veterinaria",
    icon: <StoreIcon size="2xl" />,
  },
  {
    text: "Ver Calendario",
    icon: <StoreIcon size="2xl" />,
  },
  {
    text: "Ver Facturas",
    icon: <TicketIcon size="2xl" />,
  },
  {
    text: "Ver Cupones",
    icon: <TicketIcon size="2xl" />,
  },
  {
    text: "Ver Empleados",
    icon: <EmployeeIcon size="2xl" />,
  },
  {
    text: "Ver clientes",
    icon: <MedicalIcon size="2xl" />,
  },
];

export const vetCards: UserCard[] = [
  {
    text: "Ver Información",
    icon: <InformationIcon size="2xl" />,
  },
  {
    text: "Ver Calendario",
    icon: <StoreIcon size="2xl" />,
  },
  {
    text: "Atenciones pendientes",
    icon: <MedicalIcon size="2xl" />,
  },
  {
    text: "Lista de Pacientes",
    icon: <MedicalIcon size="2xl" />,
  },
];
