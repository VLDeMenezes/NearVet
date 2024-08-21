import Link from "next/link";

interface ButtonCustomProps {
  href?: string;
  text: string;
  onClick?: () => void;
  size?: string
}
const ButtonCustom: React.FC<ButtonCustomProps> = ({ href, text, onClick, size }) => {
  return (

    href ? (
      <Link href={href} className={`bg-detail px-5 py-2 m-auto rounded-lg text-lg ${size}`}>{text}</Link>
    ) :
      <button onClick={onClick} className={`bg-detail px-5 py-2 m-auto rounded-lg text-lg ${size}`}>{text}</button>

  );
};

export default ButtonCustom;