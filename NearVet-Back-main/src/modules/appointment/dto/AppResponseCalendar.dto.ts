export class AppResponseCalendarDayDto {
    id: string;
    Subject: string; //"Rayos X - Javier", servicio - nombre del cliente
    description: string; //"Mascota: Firu - Observaciones: Sin observaciones", Pet - Observacion del Cliente
    StartTime: Date; // new Date(2024, 8, 9, 9, 0), ///anio, -mes, dia, hora, minutos Horario de comienzo
    EndTime: Date; //new Date(2024, 8, 9, 10, 0), Horario fin
    isAllDay: Boolean = false; //false, siempre en false
    petId: string;
    stateAppointment: string;
}