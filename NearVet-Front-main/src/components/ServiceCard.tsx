import { Servicio } from "@/types/interfaces";
import ButtonCustom from "./ButtonCustom";
import PATHROUTES from "@/helpers/path-routes";

export interface TarjetaCategory {
  id: string;
  categoryService: string;
  description: string;
  image: string;
}
export interface TarjetaService {
  id: string;
  service: string;
  description: string;
  sendMesasge: string;
  price: number;
  durationMin: number;
  veterinarianId: string;
  categoryServiceId: string;
  veterinarian: {
    user: {
      imgProfile: string;
    };
  };
}
export interface Service {
  data: TarjetaService;
}
const VetCard: React.FC<Service> = (data) => {
  if (!data) return;

  return (
    <div className="flex flex-col bg-purpleBackground p-2 rounded-lg gap-2 md:w-[16em] lg:w-[20em] w-[12em] shadow-lg dark:bg-darkBackgroundFront hover:scale-105 cursor-default">
      <div className="flex flex-col ">
        <div className="flex flex-col items-center">
          <h2 className="text-sm md:text-lg lg:text-xl font-extrabold text-purpleTitles my-1">
            {data.data.service}
          </h2>
        </div>
      </div>
      <p className="text-justify dark:text-gray-300 text-sm md:text-base lg:text-lg">
        {data.data.description}
      </p>
    </div>
  );
};

export default VetCard;
