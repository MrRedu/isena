'use client'
import propTypes from 'prop-types'
import { Input, Textarea } from "@/app/MTailwind";
// import { useState } from 'react';

const today = new Date();
const sixteenYearsBefore = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate()).toISOString().split("T")[0];

export const AddPatientForm = ({ patient, handleChange }) => {
  // const [expirationDate, setExpirationDate] = useState("")

  return (
    <form className="flex flex-col gap-8 p-4">
      <div className="grid md:grid-cols-2 gap-8 w-full">
        <Input
          name="nombresPaciente"
          value={patient?.nombresPaciente
            .replace(/[0-9]+$/g, "")
          }
          onChange={handleChange}
          type="text"
          variant="static"
          label="Nombres"
          required
          maxLength={64}
        />
        <Input
          name="apellidosPaciente"
          value={patient?.apellidosPaciente
            .replace(/[0-9]+$/g, "")
          }
          onChange={handleChange}
          type="text"
          variant="static"
          label="Apellidos"
          required
          maxLength={64}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-8 w-full">

        <Input
          type="text"
          variant="static"
          name="cedulaPaciente"
          label="Cédula"
          placeholder='12.345.678'
          required
          maxLength={10} // Longitud máxima para el formato (NNNNNNNN)
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          containerProps={{
            className: "!min-w-0",
          }}
          onChange={handleChange}
          value={patient?.cedulaPaciente
            .replace(/[^0-9]/g, "") // Eliminar caracteres no numéricos
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".") // Agregar puntos cada tres dígitos
            .substring(0, 10)} // Asegura que no exceda la longitud máxima
        />
        <Input
          type="date"
          name="fechaNacimientoPaciente"
          value={patient?.fechaNacimientoPaciente}
          onChange={handleChange}
          label="Fecha de nacimiento"
          variant="static"
          max={sixteenYearsBefore}
          required
        />
      </div>
      <div className="grid md:grid-cols-2 gap-8 w-full">
        <Input
          type="text"
          variant="static"
          name="telefonoPaciente"
          label="Número de Teléfono"
          required
          placeholder='(0414) 123-45-67'
          maxLength={14} // Longitud máxima para el formato (NNNN) NNN-NN-NN
          pattern="\(\d{4}\) \d{3}-\d{2}-\d{2}"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          containerProps={{
            className: "!min-w-0",
          }}
          value={patient?.telefonoPaciente
            .replace(/[^0-9]/g, "") // Eliminar caracteres no numéricos
            .replace(/(\d{4})(\d{0,3})/, (_, g1, g2) => `(${g1}) ${g2}`) // Agregar paréntesis y espacio
            .substring(0, 14)} // Asegura que no exceda la longitud máxima
          onChange={handleChange}
        />

        <Input
          name="correoPaciente"
          value={patient?.correoPaciente}
          onChange={handleChange}
          type="text"
          variant="static"
          label="Correo electrónico"
          placeholder='ej: correo@ejemplo.com'
        />
      </div>
      <Textarea name="direccionPaciente" value={patient?.direccionPaciente} onChange={handleChange} variant="static" label="Dirección física" placeholder="ej: Entre la calle Mariño y la Av. Santos Michelena de la ciudad de Maracay, estado Aragua" />
      {/* <div className="grid md:grid-cols-2 gap-8 w-full">
        <Input
          onChange={handleChange}
          type="text"
          variant="static"
          label="Altura"
          placeholder='ej: 1.70 m'
        />
        <Input
          onChange={handleChange}
          type="text"
          variant="static"
          label="Peso"
          placeholder='ej: 70 kg'
        />
      </div>
      <div className="grid md:grid-cols-2 gap-8 w-full">
        <Input
          onChange={handleChange}
          type="text"
          variant="static"
          label="Temperatura"
          placeholder='ej: 37.5 °C'
        />
        <Input
          onChange={handleChange}
          type="text"
          variant="static"
          label="Frec. Respiratoria"
          placeholder='ej: 12 rpm'
          maxLength={3}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-8 w-full">
        <Input
          type="text"
          variant="static"
          label="Presión Arterial"
          placeholder="120/80 mmHg"
          maxLength={7}
          pattern="\d{3}/\d{3}"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          containerProps={{
            className: "!min-w-0",
          }}
          value={expirationDate
            .replace(/[^0-9]/g, "")
            .replace(/(\d{3})(\d{0,3})/, (_, g1, g2) => g1 + (g2 ? '/' + g2 : ''))
            .substring(0, 7)}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
        <Input
          onChange={handleChange}
          type="text"
          variant="static"
          label="Frecuencia Cardiaca"
          placeholder='ej: 80 bpm'
          maxLength={3}
        />
      </div> */}
    </form>
  )
};

AddPatientForm.propTypes = {
  patient: propTypes.object,
  handleChange: propTypes.func
};
