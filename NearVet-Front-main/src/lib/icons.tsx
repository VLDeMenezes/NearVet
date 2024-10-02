import { IconProps } from "@/types/interfaces";
import {
  IoPawSharp,
  IoPerson,
  IoHome,
  IoPersonCircle,
  IoLogOutSharp,
  IoMoonOutline,
  IoMoon,
  IoClipboardSharp,
  IoStorefrontSharp,
  IoMailSharp,
  IoMailOpenSharp,
  IoInformationCircleSharp,
  IoTicketSharp,
  IoMedicalSharp,
  IoPersonAddSharp,
  IoPeopleOutline,
  IoPencilSharp,
  IoLogoWhatsapp,
} from "react-icons/io5";
export const PawIcon: React.FC<IconProps> = ({ size }) => (
  <IoPawSharp color="#8E44AD" className={`text-${size}`} />
);
export const HomeIcon: React.FC<IconProps> = ({ size }) => (
  <IoHome color="#8E44AD" className={`text-${size}`} />
);
export const LoginIcon: React.FC<IconProps> = ({ size }) => (
  <IoPerson color="#8E44AD" className={`text-${size}`} />
);
export const PeopleIcon: React.FC<IconProps> = ({ size }) => (
  <IoPeopleOutline color="#8E44AD" className={`text-${size}`} />
);
export const UserIcon: React.FC<IconProps> = ({ size }) => (
  <IoPersonCircle color="#8E44AD" className={`text-${size}`} />
);
export const LogOutIcon: React.FC<IconProps> = ({ size }) => (
  <IoLogOutSharp color="#8E44AD" className={`text-${size}`} />
);
export const EmployeeIcon: React.FC<IconProps> = ({ size }) => (
  <IoPersonAddSharp color="#8E44AD" className={`text-${size}`} />
);
export const TicketIcon: React.FC<IconProps> = ({ size }) => {
  return <IoTicketSharp color="#8E44AD" className={`text-${size}`} />;
};
export const MedicalIcon: React.FC<IconProps> = ({ size }) => {
  return <IoMedicalSharp color="#8E44AD" className={`text-${size}`} />;
};

export const ClipboardIcon: React.FC<IconProps> = ({ size }) => {
  return <IoClipboardSharp color="#8E44AD" className={`text-${size}`} />;
};

export const StoreIcon: React.FC<IconProps> = ({ size }) => {
  return <IoStorefrontSharp color="#8E44AD" className={`text-${size}`} />;
};

export const PencilIcon: React.FC<IconProps> = ({ size }) => {
  return <IoPencilSharp color="#8E44AD" className={`text-${size}`} />;
};

export const MailIcon: React.FC<IconProps> = ({ size, isMail }) => {
  return isMail ? (
    <IoMailOpenSharp color="#8E44AD" className={`text-${size}`} />
  ) : (
    <IoMailSharp color="#8E44AD" className={`text-${size}`} />
  );
};
export const WhatsappIcon: React.FC<IconProps> = ({ size }) => {
  return <IoLogoWhatsapp color="#8E44AD" className={`text-${size}`} />;
};

export const InformationIcon: React.FC<IconProps> = ({ size }) => {
  return (
    <IoInformationCircleSharp color="#8E44AD" className={`text-${size}`} />
  );
};

interface ThemeIconProps {
  isDark: boolean;
  onChange: () => void;
}

export const ThemeIcon: React.FC<ThemeIconProps> = ({ isDark, onChange }) => {
  return (
    <button
      onClick={onChange}
      className="flex lg:flex-col gap-2 items-center text-2xl mt-2"
    >
      {isDark ? <IoMoon color="#8E44AD" /> : <IoMoonOutline color="#8E44AD" />}
      <p className=" text-base text-detail">{isDark ? "Claro" : "Oscuro"}</p>
    </button>
  );
};
