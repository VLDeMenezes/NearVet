import { CardCustomProps } from "@/types/interfaces";

const CardCustom: React.FC<Partial<CardCustomProps>> = ({ children, text, icon, onClick, isSelect, size }) => {

  let select = 'bg-white dark:bg-darkBG text-black dark:text-white'
  let minSize = `min-w-[${size}]`
  if (isSelect === text) {
    select = 'bg-cyan-500 dark:bg-blue-700'
  }
  return (<button onClick={onClick} className={`flex flex-col gap-4 items-center justify-center p-4 border border-gray-300 shadow-md text-lg ${select} md:${minSize}`}>
    {icon}
    {text && <p className="text-black dark:text-white">{text}</p>}
    {children}
  </button>);
};

export default CardCustom;