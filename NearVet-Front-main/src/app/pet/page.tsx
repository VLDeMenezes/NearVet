"use client";
import Screen from "@/components/Screen";
import PetsModule from "@/components/sectionsModules/petsModule";
import { useUser } from "@/context/UserContext";

//ver lista de mascotas
//agregar mascota
//vista de la mascota
//-->aceptar mascotas si hay solicitudes pendientes
//-->modificar mascota
//--> dar de baja mascota
//--> transferir mascota

const Pet: React.FC = () => {
  const { user } = useUser();
  return (
    <Screen>
      <div className="mx-auto mt-5 min-h-28 dark:text-white">
        <PetsModule />
      </div>
    </Screen>
  );
};

export default Pet;
