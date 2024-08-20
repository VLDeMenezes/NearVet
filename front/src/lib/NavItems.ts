import {
  PawIcon,
  HomeIcon,
  LoginIcon,
  UserIcon,
  LogOutIcon,
} from "@/lib/icons";
interface NavItem {
  name: string;
  url: string;
  icon: () => JSX.Element;
}
export const NavItem: Array<NavItem> = [
  {
    name: "Inicio",
    url: "/",
    icon: HomeIcon,
  },
  {
    name: "Loguearse",
    url: "/sign",
    icon: LoginIcon,
  },
];

export const NavItemUser: Array<NavItem> = [
  {
    name: "Inicio",
    url: "/",
    icon: HomeIcon,
  },
  {
    name: "Mascotas",
    url: "/pet",
    icon: PawIcon,
  },
  {
    name: "Usuario",
    url: "/userDashboard",
    icon: UserIcon,
  },
  {
    name: "Salir",
    url: "/userDashboard",
    icon: LogOutIcon,
  },
];
