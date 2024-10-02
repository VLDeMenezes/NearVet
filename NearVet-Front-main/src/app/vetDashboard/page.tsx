"use client";
import Dashboard from "@/components/sectionsModules/dashboardCustom";
import Screen from "@/components/Screen";
import { vetCards } from "@/helpers/dashBoardCards";
import SectionContent from "../../components/sectionsModules/sectionContent";
import { useUser } from "@/context/UserContext";

const VetDashboard: React.FC = () => {
  //seccion usuario (que muestra informacion de usuario)
  //seccion de calendario donde muestra turnos boton de whatsapp al numero
  //articulo de turnos del dia (boton dellamado para ingresar al turno y mostrar quien esta siendo llamado) (boton de iniciar atencion y lo mueve al formulario de atencion)
  //lista de pacientes

  const { user } = useUser();
  return (
    <Screen width="full">
      <h2 className="text-3xl dark:text-darkHline">
        ¡Hola {user?.name}! ¿Qué quieres hacer?
      </h2>
      <Dashboard cards={vetCards} renderSection={SectionContent} />
    </Screen>
  );
};

export default VetDashboard;
