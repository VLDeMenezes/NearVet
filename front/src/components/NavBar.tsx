import Link from "next/link";

const NavItem = [{
  name: "Home",
  url: "/",
  icon: ""
},
{
  name: "Login",
  url: "/sign",
  icon: ""
},
{
  name: "Pet",
  url: "/pet",
  icon: ""
},
];
const NavBar: React.FC = () => {
  return (<nav className="w-full flex flex-row shadow-md  justify-between px-5 py-2">
    <h1>Logo</h1>
    <div className="flex flex-row gap-4 ">
      {NavItem.map((item) => (<Link key={item.name} href={item.url} className="text-detail text-lg">{item.name}</Link>))}
    </div>
  </nav>);
};

export default NavBar;