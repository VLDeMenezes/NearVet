import { Appointment } from "src/modules/appointment/entities/appointment.entity"
import { Coupon } from "src/modules/coupons/entities/coupon.entity"
import { Pending } from "src/modules/pending/entities/pending.entity"
import { Pet } from "src/modules/pets/entities/pet.entity"
import { Vet } from "src/modules/vets/entities/vet.entity"

export const header = (logo:string) => {
    return `<!DOCTYPE html>
          <html lang="es">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>¡Bienvenido a Nuestra Veterinaria!</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      background-color: #f4f4f4;
                      margin: 0;
                      padding: 0;
                  }
                  .container {
                      width: 100%;
                      max-width: 600px;
                      margin: 0 auto;
                      background-color: #ffffff;
                      border-radius: 8px;
                      overflow: hidden;
                      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  }
                  .header {
                      background-color: #c8a1e9;
                      padding: 20px;
                      text-align: center;
                      color: #ffffff;
                  }
                  .header img {
                      max-width: 150px;
                  }
                  .content {
                      padding: 20px;
                      text-align: center;
                  }
                  .content h1 {
                      color: #333333;
                  }
                  .content p {
                      color: #555555;
                      line-height: 1.6;
                  }
                  .button {
                      display: inline-block;
                      margin-top: 20px;
                      padding: 10px 20px;
                      background-color: #c8a1e9;
                      color: #ffffff;
                      text-decoration: none;
                      border-radius: 5px;
                  }
                  .footer {
                      background-color: #c8a1e9;
                      padding: 10px;
                      text-align: center;
                      color: #888888;
                      font-size: 12px;
                  }
                  .footer a {
                      color: #4CAF50;
                      text-decoration: none;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <!-- Logo de la veterinaria -->
                      <img src=${logo} alt="Logo de la Veterinaria">
                  </div>`
}

export const footer = (email:string) => {
  return `<div class="footer">
                <p>Si tienes alguna pregunta, no dudes en <a href="mailto:${email}">contactarnos</a>.</p>
                <p>© 2024 Veterinaria NearVet. Todos los derechos reservados.</p>
            </div>
        </div>
    </body>
    </html>`
}

// NOTIFICACIONES POR ACCION

export const welcomeNearvet = ({nombre, email, passwordDefault, logo, byGoogle}) => {
  let emailResponse = `<div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#cbd5e1', // bg-slate-300
      border: '2px solid black',
    }}
  >
    <h1
      style={{
        color: '#0f172a', // text-slate-950
        fontSize: '1.5rem', // text-2xl
        padding: '1rem', // p-4
      }}
    >
      ${nombre}! Ya formas parte de NearVet
    </h1>
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '0.5rem', // gap-2
      }}
    >
      <img
        src=${logo}
        alt="Logo de NearVet"
        style={{
          width: '250px',
          backgroundColor: '#fbbf24', // bg-detail
        }}
      />
      <div>
        <p
          style={{
            color: 'black',
            textAlign: 'center',
          }}
        >
          Nos alegra que estes con nosotros.
          <br />
          Desde NearVet nuestra prioridad es el cuidado de las mascotas.
        </p>
        <br />
        <h3
          style={{
            textAlign: 'justify',
          }}
        >
          Si todavia no iniciaste sesión te suministramos tus datos, no los
          compartas con nadie:
        </h3>
        <h4>Email: ${email}</h4>
        <h4>Contraseña: ${passwordDefault}</h4>
      </div>
    </div>`
    if (byGoogle) {
      emailResponse = emailResponse + `<div
                                          style={{
                                            marginTop: '1rem', // mt-4
                                            padding: '1rem', // px-4
                                            width: '100%',
                                            textAlign: 'center',
                                            color: 'black',
                                            backgroundColor: '#fbbf24', // bg-detail
                                          }}
                                        >
                                          <p>
                                            Atención! Te recomendamos ingresar a los ajustes de tu cuenta de
                                            NearVet y cambiar la contraseña.
                                          </p>
                                        </div>`
    }
  emailResponse = emailResponse + `</div>`
  return emailResponse
}

export const welcomeCHATGPT = ({nombre, email, passwordDefault, logo, byGoogle}) => {
  return  `<!DOCTYPE html>
          <html lang="es">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>¡Bienvenido a Nuestra Veterinaria!</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      background-color: #f4f4f4;
                      margin: 0;
                      padding: 0;
                  }
                  .container {
                      width: 100%;
                      max-width: 600px;
                      margin: 0 auto;
                      background-color: #ffffff;
                      border-radius: 8px;
                      overflow: hidden;
                      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  }
                  .header {
                      background-color: #c8a1e9;
                      padding: 20px;
                      text-align: center;
                      color: #ffffff;
                  }
                  .header img {
                      max-width: 150px;
                  }
                  .content {
                      padding: 20px;
                      text-align: center;
                  }
                  .content h1 {
                      color: #333333;
                  }
                  .content p {
                      color: #555555;
                      line-height: 1.6;
                  }
                  .button {
                      display: inline-block;
                      margin-top: 20px;
                      padding: 10px 20px;
                      background-color: #c8a1e9;
                      color: #ffffff;
                      text-decoration: none;
                      border-radius: 5px;
                  }
                  .footer {
                      background-color: #c8a1e9;
                      padding: 10px;
                      text-align: center;
                      color: #888888;
                      font-size: 12px;
                  }
                  .footer a {
                      color: #4CAF50;
                      text-decoration: none;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <!-- Logo de la veterinaria -->
                      <img src=${logo} alt="Logo de la Veterinaria">
                  </div>
                  <div class="content">
                      <h1>¡Bienvenido a Nuestra Veterinaria! - NearVet</h1>
                      <p>Hola ${nombre},</p>
                      <p>Gracias por registrarte en nuestra página web. Estamos emocionados de tenerte con nosotros. En nuestra veterinaria, nos dedicamos a brindar el mejor cuidado a tu mascota con servicios de calidad y mucho amor.</p>
                      <p>No dudes en explorar nuestra página, conocer nuestros servicios, y aprender más sobre cómo podemos ayudarte a ti y a tu mascota.</p>
                      <!-- Botón de llamada a la acción -->
                      <a href="https://near-vet-front-git-main-teamhvets-projects.vercel.app/" class="button">Visita nuestra página</a>
                  </div>
                  <div class="footer">
                      <p>Si tienes alguna pregunta, no dudes en <a href="mailto:teamhvet@gmail.com">contactarnos</a>.</p>
                      <p>© 2024 Veterinaria NearVet. Todos los derechos reservados.</p>
                  </div>
              </div>
          </body>
          </html>`
}

export const notificationAppointmentUserEmail = (appointment: Appointment, vet:Vet) => {
  return `  ${header(vet.imgLogo)}
  <div class="content">
      <h1>¡Hola ${appointment.pet.user.name}! Sacaste un turno en ${vet.name} para tu mascota</h1>
      <h3>¡Te pasamos la info!</h3>
      <img src=${appointment.pet.imgProfile} style={{ width: '100px', }} alt="Imagen de Mascota">
      <p>Turno reservado para tu mascota: ${appointment.pet.name}</p>
      <p>Fecha del Turno: ${appointment.date.toLocaleDateString}</p>
      <p>¿En que Horario? -> ${appointment.time}</p>
      <p>Servicio Solicitado: ${appointment.service.service}</p>
      <p>Esta fue tu observacion: ${appointment.messageUser}</p>
      <p>${appointment.service.sendMesasge}</p>
      </br>
      </br>
      <p>No dudes en explorar nuestra página, conocer nuestros servicios, y aprender más sobre cómo podemos ayudarte a ti y a tu mascota.</p>
      <!-- Botón de llamada a la acción -->
      <a href=${vet.urlWebPage} class="button">Visita nuestra página</a>
  </div>
  ${footer(vet.email)}`
}

export const notificationAppointmentVetEmail = (appointment: Appointment, vet:Vet) => {
  return `  ${header(vet.imgLogo)}
  <div class="content">
      <h1>¡Hola ${appointment.service.veterinarian.user.name}! </h1>
      <h3>¡El cliente ${appointment.pet.user.name} saco un nuevo turno!</h3>
      <h4>Te pasamos la info,</h4>
      <img src=${appointment.pet.imgProfile} style={{ width: '100px', }} alt="Imagen de Mascota">
      <p>Turno reservado para tu mascota: ${appointment.pet.name}</p>
      <p>Fecha del Turno: ${appointment.date.toLocaleDateString}</p>
      <p>¿En que Horario? -> ${appointment.time}</p>
      <p>Servicio Solicitado: ${appointment.service.service}</p>
      <p>Esta fue tu observacion: ${appointment.messageUser}</p>
      <p>${appointment.service.sendMesasge}</p>
      </br>
      </br>
      <p>No dudes en explorar nuestra página, conocer nuestros servicios, y aprender más sobre cómo podemos ayudarte a ti y a tu mascota.</p>
      <!-- Botón de llamada a la acción -->
      <a href=${vet.urlWebPage} class="button">Visita nuestra página</a>
  </div>
  ${footer(vet.email)}`
}

export const notificationRegisterPetEmail = (pet: Pet, vet:Vet) => {
  return `  ${header(vet.imgLogo)}
  <div class="content">
      <h1>¡Hola ${pet.user.name}! - Felicitaciones por registrar tu mascota</h1>
      
      <h4>Te pasamos la info de ${pet.name}</h4>
      <img src=${pet.imgProfile} style={{ width: '100px', }} alt="Imagen de Mascota">
      <p>Especie: ${pet.specie.specie}</p>
      <p>Raza: ${pet.race.race}</p>
      <p>Sexo:  ${pet.sex.sex}</p>
      </br>
      <p>GRACIAS POR CONFIARNOS EL CUIDADO DE TU PELUDO AMIGO</p>
      </br>
      </br>
      <p>No dudes en explorar nuestra página, conocer nuestros servicios, y aprender más sobre cómo podemos ayudarte a ti y a tu mascota.</p>
      <!-- Botón de llamada a la acción -->
      <a href=${vet.urlWebPage} class="button">Visita nuestra página</a>
  </div>
  ${footer(vet.email)}`
}

export const notificationCouponUserEmail = (coupon: Coupon, vet:Vet) => {
  return `  ${header(vet.imgLogo)}
  <div class="content">
      <h1>¡Hola ${coupon.user.name}! - TENES UN DESCUENTO DEL ${coupon.valorPorc}%</h1>
      
      <h2>Usalo para los turnos</h2>
      <h3>Tu clave es: ${coupon.code}</h3>
      <p>Usarlo es sencillo. Ingresa a la pagina, saca un turno, inclui tu codigo de descuento y aprovechalo al maximo</p>
      </br>
      <p>GRACIAS POR CONFIARNOS EL CUIDADO DE TU PELUDO AMIGO</p>
      </br>
      </br>
      <p>No dudes en explorar nuestra página, conocer nuestros servicios, y aprender más sobre cómo podemos ayudarte a ti y a tu mascota.</p>
      <!-- Botón de llamada a la acción -->
      <a href=${vet.urlWebPage} class="button">Visita nuestra página</a>
  </div>
  ${footer(vet.email)}`
}


// RECORDATORIOS AUTOMATICOS

export const recordingAppointmentEmail = (appointment: Appointment, vet:Vet) => {
return `  ${header(vet.imgLogo)}
            <div class="content">
                <h1>¡Hola ${appointment.pet.user.name}! </h1>
                <h3>¡Te escribimos desde ${vet.name} para recordarte tu TURNO!</h3>
                <h4>Te pasamos la info,</h4>
                <img src=${appointment.pet.imgProfile} style={{ width: '100px', }} alt="Imagen de Mascota">
                <p>Turno reservado para tu mascota: ${appointment.pet.name}</p>
                <p>Fecha del Turno: ${appointment.date.toLocaleDateString}</p>
                <p>¿En que Horario? -> ${appointment.time}</p>
                <p>Servicio Solicitado: ${appointment.service.service}</p>
                <p>Esta fue tu observacion: ${appointment.messageUser}</p>
                <p>${appointment.service.sendMesasge}</p>
                </br>
                </br>
                <p>No dudes en explorar nuestra página, conocer nuestros servicios, y aprender más sobre cómo podemos ayudarte a ti y a tu mascota.</p>
                <!-- Botón de llamada a la acción -->
                <a href=${vet.urlWebPage} class="button">Visita nuestra página</a>
            </div>
            ${footer(vet.email)}`
}

export const recordingPendingEmail = (pending: Pending, vet:Vet) => {
  return `  ${header(vet.imgLogo)}
              <div class="content">
                  <h1>¡Hola ${pending.pet.user.name}! </h1>
                  <h3>¡Te escribimos desde ${vet.name} para recordarte que tenes una cita pendiente!</h3>
                  <h4>Te pasamos la info,</h4>
                  <img src=${pending.pet.imgProfile} style={{ width: '100px', }} alt="Imagen de Mascota">
                  <p>La atención es necesaria para tu mascota: ${pending.pet.name}</p>
                  <p>Fecha del Pendiente: ${pending.date.toLocaleDateString}</p>
                  <p>Servicio Pendiente: ${pending.service.service}</p>
                  <p>Esta fue la descripcion del Veterinario: ${pending.description}</p>
                  <p>${pending.service.sendMesasge}</p>
                  </br>
                  <p>¡NO OLVIDES RESERVAR TU TURNO!</p>
                  </br>
                  </br>
                  <p>No dudes en explorar nuestra página, conocer nuestros servicios, y aprender más sobre cómo podemos ayudarte a ti y a tu mascota.</p>
                  <!-- Botón de llamada a la acción -->
                  <a href=${vet.urlWebPage} class="button">Visita nuestra página</a>
              </div>
              ${footer(vet.email)}`
  }
