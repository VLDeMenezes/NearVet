import clsx from "clsx";
import {
  ButtonCustomOptionalProps,
  ButtonCustomProps,
} from "@/types/interfaces";
import Link from "next/link";

const Button: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void; type?: string; href?: string }> = ({ children, className, onClick, type, href }) => {
  const baseClasses = "px-5 py-2 mx-6 rounded-lg text-white hover:scale-105";
  
  const combinedClasses = clsx(baseClasses, className);

  return href ? (
    <Link href={href} className={combinedClasses}>
      {children}
    </Link>
  ) : (
    <button type={type as "button" | "submit" | "reset" | undefined} onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
};

const ButtonCustom: React.FC<
  ButtonCustomProps & Partial<ButtonCustomOptionalProps>
> = ({ href, type = "button", text, onClick, size, color, bgcolor }) => {
  const sizeClass = size ? `text-${size}` : "";
  const colorClass = color ? `text-${color}` : "";
  const bgColorClass = bgcolor ? `bg-${bgcolor}` : "bg-detail";

  return (
    <Button className={`${sizeClass} ${colorClass} ${bgColorClass}`} onClick={onClick} type={type} href={href}>
      {text}
    </Button>
  );
};

export default ButtonCustom;