import { Servicio } from "@/types/interfaces";
import ButtonCustom from "./ButtonCustom";
import PATHROUTES from "@/helpers/path-routes";

export interface TarjetaCategory {
  id: string;
  categoryService: string;
  description: string;
  image: string;
}

export interface Service {
  data: TarjetaCategory;
}
const CategoryCard: React.FC<Service> = (data) => {
  if (!data) return;

  return (
    <div className="flex flex-col bg-purpleBackground p-5 rounded-lg gap-5 md:w-[16em] lg:w-[20em] w-[1/3] shadow-lg dark:bg-darkBackgroundFront hover:scale-105">
      <div className="flex justify-between">
        <div className="flex flex-col items-center">
          <img src={data.data.image} alt="Imagen de la categoria  " />
          <h2 className="text-sm md:text-lg lg:text-xl font-extrabold text-purpleTitles my-2">
            {data.data.categoryService}
          </h2>
        </div>
      </div>
      <p className="text-justify dark:text-gray-300 text-sm md:text-base lg:text-lg">
        {data.data.description}
      </p>
      <div className="flex justify-end mx-auto">
        <ButtonCustom text="Agendar" href={`${PATHROUTES.NEWAPPOINTMEN}`} />
      </div>
    </div>
  );
};

export default CategoryCard;
