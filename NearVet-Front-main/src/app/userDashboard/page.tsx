"use client";

import Screen from "@/components/Screen";
import { useUser } from "@/context/UserContext";
import SectionContent from "../../components/sectionsModules/sectionContent";
import { userCards } from "@/helpers/dashBoardCards";
import Dashboard from "@/components/sectionsModules/dashboardCustom";

const UserDashboard: React.FC = () => {
  const { user } = useUser();
  return (
    <Screen>
      <h2 className="text-3xl dark:text-darkHline">
        ¡Hola {user?.name}! ¿Qué quieres hacer?
      </h2>
      <Dashboard cards={userCards} renderSection={SectionContent} />
    </Screen>
  );
};

export default UserDashboard;
