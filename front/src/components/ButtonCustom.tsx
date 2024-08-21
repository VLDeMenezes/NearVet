import Link from "next/link";

interface ButtonCustomProps {
  text: string;
}

interface ButtonCustomOptionalProps extends ButtonCustomProps {
  href: string;
  size: string;
  color: string;
  bgcolor: string;
  onClick: () => void;

}
const ButtonCustom: React.FC<ButtonCustomProps & Partial<ButtonCustomOptionalProps>> = ({ href, text, onClick, size = 'base', color = 'white', bgcolor = 'detail' }) => {
  const sizeClass = `text-${size}`;
  const colorClass = `text-${color}`;
  const bgColorClass = `bg-${bgcolor}`;

  return (
    href ? (
      <Link href={href} aria-label={`Link para ${text}`} className={` px-5 py-2 m-auto rounded-lg text-lg ${sizeClass} ${colorClass} ${bgColorClass}`}>{text}</Link>
    ) : (
      <button onClick={onClick} aria-label={`Boton para ${text}`} className={` px-5 py-2 m-auto rounded-lg text-lg ${sizeClass} ${colorClass} ${bgColorClass}`}>{text}</button>
    )
  );
};


export default ButtonCustom;