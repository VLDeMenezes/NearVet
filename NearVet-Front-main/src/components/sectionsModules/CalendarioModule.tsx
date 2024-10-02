"use client";
import {
  Inject,
  ScheduleComponent,
  ViewDirective,
  Day,
  Week,
  Month,
  ViewsDirective,
  Agenda,
  NavigatingEventArgs,
} from "@syncfusion/ej2-react-schedule";
import React, { useEffect, useState } from "react";
import { loadCldr, registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "MzQ2NTg0MkAzMjM2MmUzMDJlMzBaQzRISjI5OS9WQmJMdG1DNW1aaDlEQURhdjhFQlJxTzV4OE52YWUzdFZRPQ==;Mgo+DSMBaFt5QHFqVkNrXVNbdV5dVGpAd0N3RGlcdlR1fUUmHVdTRHRbQlRjQH5ad0RmXXZYc3U=;Mgo+DSMBPh8sVXJyS0d+X1RPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9nSXdTf0VqWH5bdXRVT2k=;ORg4AjUWIQA/Gnt2U1hhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5adkxjUH5fdXFVRGVZ;NRAiBiAaIQQuGjN/V0B+XU9Hc1RDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS3pTf0VqWXZfcXFQRmRdUA==;MzQ2NTg0N0AzMjM2MmUzMDJlMzBSdTU1bTZHZWNJaC9Ra1JkTE5MUTRyMk9pRmF4STZuRFFJOE03bUM4MHlRPQ==;MzQ2NTg0OEAzMjM2MmUzMDJlMzBSRktuTGlwcUlMZThFK0dhaGs5TXdqOEtDT01tQUorNkhkaWF0NGVVU1hNPQ==;Mgo+DSMBMAY9C3t2U1hhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5adkxjUH5fdXFUT2hf;MzQ2NTg1MEAzMjM2MmUzMDJlMzBvSXdGeGFWNTVkQmhXZ0hBOHg1TUd2VXlNREVxd01IMlhOaVNPU0I2RFBVPQ==;MzQ2NTg1MUAzMjM2MmUzMDJlMzBkUHByWklKNUc2Sm5malc3NVRvTUlyT3I1Y1NrMTJrRCtjeFBwYlFHQVFRPQ=="
);
import frNumberData from "@syncfusion/ej2-cldr-data/main/es-AR/numbers.json";
import frtimeZoneData from "@syncfusion/ej2-cldr-data/main/es-AR/timeZoneNames.json";
import frGregorian from "@syncfusion/ej2-cldr-data/main/es-AR/ca-gregorian.json";
import frNumberingSystem from "@syncfusion/ej2-cldr-data/supplemental/numberingSystems.json";
import { useUser } from "@/context/UserContext";
import {
  fetchTurnosService,
  fetchTurnosServiceAdmin,
} from "@/lib/Services/appointService";
import useLoading from "@/hooks/LoadingHook";
import Loading from "../Loading";

loadCldr(frNumberData, frtimeZoneData, frGregorian, frNumberingSystem);

const CalendarioModule = () => {
  const [turnosBackend, setTurnos] = useState([]);
  const { user } = useUser();
  const [firstDate, setFirstDate] = useState<Date | null>(null);
  const [lastDate, setLastDate] = useState<Date | null>(null);
  const { loading, startLoading, stopLoading } = useLoading();
  const calculateMonthDates = (currentDate: Date) => {
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    return { firstDay, lastDay };
  };
  const onNavigating = (args: NavigatingEventArgs) => {
    const { currentDate } = args;
    const { firstDay, lastDay } = calculateMonthDates(currentDate as Date);
    setFirstDate(firstDay);
    setLastDate(lastDay);
  };

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        startLoading();
        if (!user?.id || !firstDate || !lastDate) return;
        if (user.role.role === "adminVet") {
          const response = await fetchTurnosServiceAdmin(
            user.id,
            firstDate,
            lastDate
          );
          if (response.length > 0) setTurnos(response);
        } else {
          const response = await fetchTurnosService(
            user.id,
            firstDate,
            lastDate
          );
          if (response.length > 0) setTurnos(response);
        }
      } finally {
        stopLoading();
      }
    };
    if (user?.id && firstDate && lastDate) {
      fetchTurnos();
    }
  }, [user, firstDate, lastDate]);

  return (
    <div>
      <h3 className="text-xl text-detail">Calendario</h3>
      {loading && <Loading />}
      <section className="shadow-lg p-5 m-auto w-full md:w-4/5 flex flex-col gap-2 my-2 cursor-default">
        {turnosBackend && (
          <ScheduleComponent
            eventSettings={{
              dataSource: turnosBackend,
              allowAdding: false,
              allowDeleting: false,
              allowEditing: false,
            }}
            startHour="06:00"
            endHour="23:00"
            currentView="Agenda"
            locale="es-AR"
            navigating={onNavigating}
          >
            <ViewsDirective>
              <ViewDirective option="Day" displayName="Dia" />
              <ViewDirective option="Agenda" />
              <ViewDirective option="Week" displayName="Semana" />
              <ViewDirective option="Month" displayName="Mes" />
            </ViewsDirective>
            <Inject services={[Day, Week, Month, Agenda]} />
          </ScheduleComponent>
        )}
      </section>
    </div>
  );
};

export default CalendarioModule;
