import Link from "next/link";

interface ButtonCustomProps {
  text: string;
}

interface ButtonCustomOptionalProps extends ButtonCustomProps {
  href: string;
  size: string;
  color: string;
  onClick: () => void;

}
const ButtonCustom: React.FC<ButtonCustomProps & Partial<ButtonCustomOptionalProps>> = ({ href, text, onClick, size = 'base', color = 'white' }) => {
  const sizeClass = `text-${size}`;
  const colorClass = `text-${color}`;

  return (
    href ? (
      <Link href={href} aria-label={`Link para ${text}`} className={`bg-detail px-5 py-2 m-auto rounded-lg text-lg ${sizeClass} ${colorClass}`}>{text}</Link>
    ) : (
      <button onClick={onClick} aria-label={`Boton para ${text}`} className={`bg-detail px-5 py-2 m-auto rounded-lg text-lg ${sizeClass} ${colorClass}`}>{text}</button>
    )
  );
};


export default ButtonCustom;