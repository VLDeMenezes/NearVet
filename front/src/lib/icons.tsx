import { IoPawSharp, IoPerson, IoHome, IoPersonCircle, IoLogOutSharp, IoMoonOutline, IoMoon } from "react-icons/io5";

export const PawIcon = () => {
  return <IoPawSharp color="#8E44AD" />;
};

export const HomeIcon = () => {
  return <IoHome color="#8E44AD" />;
};

export const LoginIcon = () => {
  return <IoPerson color="#8E44AD" />;
};

export const UserIcon = () => {
  return <IoPersonCircle color="#8E44AD" />;
}
export const LogOutIcon = () => {
  return <IoLogOutSharp color="#8E44AD" />;
}

interface ThemeIconProps {
  isDark: boolean;
}
export const ThemeIcon: React.FC<ThemeIconProps> = ({ isDark }) => {
  return (
    console.log("tema oscuro?", isDark),
    <button onClick={() => {
      if (isDark) {
        //aca podes poner la logica que quieras esta me salto con el copilot pero la idea es chequear que tema esta y cambiarlo
        console.log("thema cambiado a dark")
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      }
    }} className="flex flex-col gap-2 items-center text-2xl">
      {isDark ?
        <IoMoonOutline color="#8E44AD" />
        :
        <IoMoon color="#8E44AD" />
      }
      <p className="text-base text-detail">{isDark ? "Claro" : "Oscuro"}</p>

    </button>
  )
}

