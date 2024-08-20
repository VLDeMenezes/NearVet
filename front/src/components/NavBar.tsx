import { NavItem, NavItemUser } from "@/lib/NavItems";
import Link from "next/link";



const NavBar: React.FC = () => {
  return (<nav className="w-full flex flex-row shadow-md  justify-between px-5 py-2">
    <h1 className="text-2xl font-bold text-detail text-center self-center">Logo</h1>
    <div className="flex flex-row gap-4 ">
      {NavItemUser.map((item) => (<Link key={item.name} href={item.url} className="text-detail mx-2">

        <div className="flex flex-col gap-2 items-center text-2xl">
          {
            item.icon()
          }
          <p className="text-base">

            {item.name}
          </p>
        </div>
      </Link>))}
    </div>
  </nav>);
};

export default NavBar;