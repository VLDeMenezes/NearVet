import { FormNewAppointment } from "@/types/interfaces";
import {
  addAppointmentService,
  cancelAppointmentService,
  fetchAppointService,
  newExaminationService,
  newFilesService,
  newPendingService,
  newPrescriptionService,
  newTratmentsService,
} from "../Services/appointService";
import { ErrorNotify, PromessNotify } from "../toastyfy";
import {
  fetchRecetaPetService,
  fetchTratmentPetService,
} from "../Services/tratmentsService";

//appointControllers
export const fetchAppointController = async (
  userId: string,
  token: string,
  page: number
) => {
  try {
    const response = await fetchAppointService(userId, token, page);
    return response;
  } catch (error: any) {
    ErrorNotify(`Error al cargar tus turnos: ${error.message}`);
  }
};

export const newAppointmentController = async (values: FormNewAppointment) => {
  try {
    const responseAppoitn = await PromessNotify(
      "Registrando tu turno...",
      "Ya reservamos tu lugar, solo resta pagar! Vamos a redireccionarte",
      addAppointmentService(values)
    );
    return responseAppoitn;
  } catch (error: any) {
    ErrorNotify(`Error al registrar tu turno: ${error.message}`);
  }
};

export const cancelAppointController = async (
  userId: string,
  token: string,
  idTurno: string
) => {
  try {
    const responseCancel = await PromessNotify(
      "Cancelando tu turno...",
      "Cancelado exitosamente",
      cancelAppointmentService(userId, token, idTurno)
    );
    return responseCancel;
  } catch (error: any) {
    ErrorNotify(`Error al cancelar tu turno: ${error.message}`);
  }
};

export const TratmentsController = async (idPet: string) => {
  try {
    const responseTratamiento = await fetchTratmentPetService(idPet);
    return responseTratamiento;
  } catch (error: any) {
    ErrorNotify(`Error al cargar los tratamientos: ${error.message}`);
  }
};

export const RecetasController = async (idPet: string) => {
  try {
    const responseReceta = await fetchRecetaPetService(idPet);
    return responseReceta;
  } catch (error: any) {
    ErrorNotify(`Error al cargar las Recetas: ${error.message}`);
  }
};

export const ExaminationController = async (values: any) => {
  try {
    const responseExamination = await PromessNotify(
      "Registrando la Examinacion...",
      "Registrado exitosamente",
      newExaminationService(values)
    );
    return responseExamination;
  } catch (error: any) {
    ErrorNotify(`Error al registrar tu turno: ${error.message}`);
  }
};
export const NewTratmentsController = async (values: any) => {
  try {
    const responseExamination = await PromessNotify(
      "Registrando la Examinacion...",
      "Registrado exitosamente",
      newTratmentsService(values)
    );
    return responseExamination;
  } catch (error: any) {
    ErrorNotify(`Error al registrar tu turno: ${error.message}`);
  }
};
export const NewPrescriptionController = async (values: any) => {
  try {
    const responseExamination = await PromessNotify(
      "Registrando la Prescripcion...",
      "Registrado exitosamente",
      newPrescriptionService(values)
    );
    return responseExamination;
  } catch (error: any) {
    ErrorNotify(`Error al registrar tu turno: ${error.message}`);
  }
};
export const NewPendingController = async (values: any) => {
  try {
    const responseExamination = await PromessNotify(
      "Registrando la Examinacion...",
      "Registrado exitosamente",
      newPendingService(values)
    );
    return responseExamination;
  } catch (error: any) {
    ErrorNotify(`Error al registrar tu turno: ${error.message}`);
  }
};
export const NewFilesController = async (id: string, values: any) => {
  try {
    const responseExamination = await PromessNotify(
      "Registrando el archivo...",
      "Registrado exitosamente",
      newFilesService(id, values)
    );
    return responseExamination;
  } catch (error: any) {
    ErrorNotify(`Error al registrar tu turno: ${error.message}`);
  }
};
