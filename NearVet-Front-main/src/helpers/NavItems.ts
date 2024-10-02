import {
  PawIcon,
  HomeIcon,
  LoginIcon,
  UserIcon,
  LogOutIcon,
  ClipboardIcon,
  StoreIcon,
  MailIcon,
  PeopleIcon,
  WhatsappIcon,
} from "@/lib/icons";
import PATHROUTES from "./path-routes";
import { NavItemProps } from "@/types/interfaces";

export const NavItem: Array<NavItemProps> = [
  {
    name: "Inicio",
    url: PATHROUTES.HOME,
    icon: HomeIcon,
  },
  {
    name: "Iniciar Sesion",
    url: PATHROUTES.LOGIN,
    icon: LoginIcon,
  },
  {
    name: "Nosotros",
    url: PATHROUTES.ABOUTUS,
    icon: PeopleIcon,
  },
];

export const NavItemUser: Array<NavItemProps> = [
  {
    name: "Inicio",
    url: PATHROUTES.HOME,
    icon: HomeIcon,
  },
  {
    name: "Mis Mascotas",
    url: PATHROUTES.PET,
    icon: PawIcon,
  },
  {
    name: "Mi Cuenta",
    url: PATHROUTES.USER_DASHBOARD,
    icon: UserIcon,
  },
  {
    name: "NearVet",
    url: `${PATHROUTES.WHATSAPP}/3758488428?text=Hola,%20tengo%20una%20consulta`,
    icon: WhatsappIcon,
  },
  {
    name: "Salir",
    url: "",
    icon: LogOutIcon,
  },
];

export const NavItemAdmin: Array<NavItemProps> = [
  {
    name: "Inicio",
    url: PATHROUTES.HOME,
    icon: HomeIcon,
  },
  {
    name: "Admin",
    url: PATHROUTES.ADMIN_DASHBOARD,
    icon: StoreIcon,
  },

  // {
  //   name: "Mensajes",
  //   url: `${PATHROUTES.WHATSAPP}/3758488428?text=Hola,%20tengo%20una%20consulta`,
  //   icon: MailIcon,
  // },
  {
    name: "Salir",
    url: "",
    icon: LogOutIcon,
  },
];

export const NavItemVet: Array<NavItemProps> = [
  {
    name: "Inicio",
    url: PATHROUTES.HOME,
    icon: HomeIcon,
  },
  {
    name: "Veterinario",
    url: PATHROUTES.VET_DASHBOARD,
    icon: ClipboardIcon,
  },
  // {
  //   name: "Mensajes",
  //   url: `${PATHROUTES.WHATSAPP}/3758488428?text=Hola,%20tengo%20una%20consulta`,
  //   icon: MailIcon,
  // },
  {
    name: "Salir",
    url: "",
    icon: LogOutIcon,
  },
];
