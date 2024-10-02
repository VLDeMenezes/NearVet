"use client";
import { MailIcon, ThemeIcon } from "@/lib/icons";
import {
  NavItem,
  NavItemUser,
  NavItemAdmin,
  NavItemVet,
} from "@/helpers/NavItems";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
const LOGO_URL = process.env.NEXT_PUBLIC_LOGO;

const NavBar: React.FC = () => {
  const { user, logout } = useUser();
  const [isDark, setIsDark] = useState(false);
  const [navItems, setNavItems] = useState(NavItem);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [logoPag, setLogoPag] = useState<string>("");

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);
  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  useEffect(() => {
    const fetchLogo = async () => {
      const storedLogo = localStorage.getItem("logo");
      if (storedLogo) {
        setLogoPag(storedLogo);
      } else {
        const logo = await fetch(LOGO_URL as string);
        const logoText = await logo.text();
        setLogoPag(logoText);
        localStorage.setItem("logo", logoText);
      }
    };
    fetchLogo();
    if (!user) {
      setNavItems(NavItem);
    } else if (user.role) {
      switch (user.role.role) {
        case "user":
          setNavItems(NavItemUser);
          break;
        case "adminVet":
          setNavItems(NavItemAdmin);
          break;
        case "veterinarian":
          setNavItems(NavItemVet);
          break;
        default:
          setNavItems(NavItem);
          break;
      }
    } else {
      setNavItems(NavItem);
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !(menuRef.current as HTMLDivElement).contains(
          event.target as Node | null
        )
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const isMail = true; //TODO necesitamos un handler para el mail, para saber si hay un mail o no para el usuario

  return (
    <nav className="dark:bg-darkBackgroundFront dark:border-0 w-full flex flex-row justify-between px-5 py-2 border border-1 shadow-[rgba(0,_0,_0,_0.24)_0px_2px_4px]">
      <Link
        className="text-4xl font-bold text-detail text-center self-center flex items-center"
        href={"/"}
      >
        <Image
          src={logoPag}
          alt="Logo Nearvet"
          width={64}
          height={64}
          priority
          onError={() => setLogoPag("/logoNear.png")}
        />
        NearVet
      </Link>
      <div className="flex flex-row items-center gap-4">
        {/* Button to toggle menu on mobile */}
        <button
          className="block lg:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {/* Icon for menu button (hamburger icon) */}
          <span>☰</span>
        </button>
        {/* Menu for desktop */}
        <div className="hidden lg:flex flex-row gap-4 items-baseline align-baseline">
          {navItems.map((item) =>
            item.name !== "Salir" ? (
              <Link
                key={item.name}
                href={item.url}
                className="text-detail mx-2"
              >
                <div className="flex flex-col gap-2 items-center text-2xl">
                  {React.cloneElement(
                    <item.icon />,
                    item.icon === MailIcon ? { isMail } : { size: "default" }
                  )}
                  <p className="text-base">{item.name}</p>
                </div>
              </Link>
            ) : (
              <button
                key={item.name}
                className="text-detail mx-2"
                onClick={() => logout()}
              >
                <div className="flex flex-col gap-2 items-center text-2xl">
                  {item.icon({ size: "default" })}
                  <p className="text-base">{item.name}</p>
                </div>
              </button>
            )
          )}
          <ThemeIcon isDark={isDark} onChange={toggleTheme} />
        </div>
        {/* Menu for mobile */}
        <div
          ref={menuRef}
          className={`lg:hidden fixed top-0 right-0 w-2/3 h-full bg-white dark:bg-gray-800 transition-transform transform ${
            isMenuOpen
              ? "translate-x-0 border-s-4 z-50 border-detail border-opacity-85 "
              : "translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-4 text-2xl"
            onClick={() => setIsMenuOpen(false)}
          >
            ×
          </button>
          <div className="flex flex-col items-center mt-16">
            {navItems.map((item) =>
              item.name !== "Salir" ? (
                <Link
                  key={item.name}
                  href={item.url}
                  className="text-detail my-4 text-2xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex lg:flex-col gap-2 items-center">
                    {React.cloneElement(
                      <item.icon />,
                      item.icon === MailIcon ? { isMail } : { size: "default" }
                    )}
                    <p className="text-base">{item.name}</p>
                  </div>
                </Link>
              ) : (
                <button
                  key={item.name}
                  className="text-detail my-4 text-2xl"
                  onClick={() => logout()}
                >
                  <div className="flex lg:flex-col gap-2 items-center">
                    {item.icon({ size: "default" })}
                    <p className="text-base">{item.name}</p>
                  </div>
                </button>
              )
            )}
            <ThemeIcon isDark={isDark} onChange={toggleTheme} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
