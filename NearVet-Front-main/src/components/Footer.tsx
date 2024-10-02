import { LuFacebook, LuInstagram } from "react-icons/lu";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import Link from "next/link";
import PATHROUTES from "@/helpers/path-routes";

const Footer: React.FC = () => {
  return (
    <footer className="w-full flex flex-col px-10 py-4 border border-t-2 dark:bg-darkBackgroundFront dark:border-0 dark:text-gray-200">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-1">
          <Link className="flex text-lg" href={PATHROUTES.TERMS}>
            <FaGreaterThan className="text-detail pt-2" />
            Términos y condiciones
          </Link>
          <Link className="flex text-lg" href={PATHROUTES.ABOUTUS}>
            <FaGreaterThan className="text-detail pt-2" />
            Acerca de Nosotros
          </Link>
          <Link className="flex text-lg" href={PATHROUTES.FAQ}>
            <FaGreaterThan className="text-detail pt-2" />
            FAQ's
          </Link>
        </div>
        <div className="flex flex-row justify-evenly gap-5 items-center">
          <Link href={PATHROUTES.HOME}>
            <LuInstagram className="text-5xl text-detail" />
          </Link>
          <Link href={PATHROUTES.HOME}>
            <LuFacebook className="text-5xl text-detail" />
          </Link>
        </div>
      </div>
      <h3 className="text-center dark:text-gray-300">
        ©NearVet 2024. Todos los derechos reservados.
      </h3>
    </footer>
  );
};

export default Footer;
