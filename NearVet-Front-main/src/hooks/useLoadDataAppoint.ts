import { useEffect, useState } from "react";
import { Mascota } from "@/types/interfaces";
import {
  categoryServices,
  horariosService,
  serviceServices,
} from "@/lib/Services/appointService";

import { consulta, ErrorNotify, InfoNotify } from "@/lib/toastyfy";
import { fetchPetsController } from "@/lib/Controllers/petController";
import { useRouter } from "next/navigation";
import PATHROUTES from "@/helpers/path-routes";
const timeNow = new Date();
const formattedTimeNow = `${String(timeNow.getHours()).padStart(
  2,
  "0"
)}:${String(timeNow.getMinutes()).padStart(2, "0")}`;

export const useAppointmentData = (userId: string, token: string) => {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [categories, setCategories] = useState<
    { id: string; categoryService: string; description: string }[]
  >([]);
  const [services, setServices] = useState<any[]>([]);
  const [horarios, setHorarios] = useState<{ id: string; hour: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [categorySelect, setCategorySelect] = useState("");
  const [mascotaSelect, setMascotaSelect] = useState<Mascota | null>(null);
  const [daySelect, setDaySelect] = useState<Date | null>(null);
  const [serviceSelect, setServiceSelect] = useState<{
    id: string;
    service: string;
    description?: string;
    price?: number;
  } | null>(null);
  const router = useRouter();
  const today = new Date();

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [responseMascotas, responseCategory] = await Promise.all([
          fetchPetsController(userId, token),
          categoryServices(),
        ]);
        if (responseMascotas.length === 0) {
          consulta("No tienes una mascota, primero deberías crearla", () =>
            router.push(PATHROUTES.NEW_PET)
          );
        }
        setMascotas(responseMascotas);

        setCategories(responseCategory);
      } catch (error) {
        ErrorNotify(`Estamos teniendo problemas: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    if (userId && token) {
      fetchData();
    }
  }, [userId, token]);

  useEffect(() => {
    if (!daySelect) return;
    fetchHorarios(serviceSelect?.id as string);
  }, [daySelect]);

  const fetchServices = async (categoryId: string) => {
    if (!categoryId) return;
    const returnServices = await serviceServices(categoryId);
    setServices(returnServices);
  };

  const fetchHorarios = async (serviceId: string) => {
    if (!serviceId) return;

    if (daySelect) {
      const daySelectDate = new Date(daySelect);
      const normalizedDaySelect = daySelectDate.toISOString().split("T")[0];
      const returnHorarios = await horariosService(serviceId, daySelect);
      if (formatDate(today) === normalizedDaySelect) {
        InfoNotify("Pueden no quedar horarios disponibles para hoy");
        const availibiryHorarios = returnHorarios.filter(
          (hour: { id: string; hour: string }) => hour.hour > formattedTimeNow
        );
        setHorarios(availibiryHorarios);
      } else {
        setHorarios(returnHorarios);
      }
    }
  };

  const handleOnChange = (value: string) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Regex para el formato de fecha "aaaa-mm-dd"
    categories.map((category) => {
      if (category.id === value) {
        setCategorySelect(value);
        fetchServices(category.id);
      }
    });
    mascotas.map((mascota) => {
      if (mascota.id === value) {
        setMascotaSelect(mascota);
      }
    });
    services.map((service) => {
      if (service.id === value) {
        setServiceSelect({
          id: service.id,
          service: service.serviceName,
          description: service.description,
          price: service.price,
        });
      }
    });
    if (dateRegex.test(value)) {
      setDaySelect(new Date(value));
    }
  };

  return {
    mascotas,
    categories,
    services,
    horarios,
    loading,
    categorySelect,
    mascotaSelect,
    daySelect,
    serviceSelect,
    setCategorySelect,
    setDaySelect,
    handleOnChange,
    fetchServices,
    fetchHorarios,
  };
};
