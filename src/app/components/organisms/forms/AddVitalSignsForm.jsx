'use client'

import { Input } from "@/app/MTailwind";
import { useState } from "react";

export const AddVitalSignsForm = () => {
  const [expirationDate, setExpirationDate] = useState("")

  const handleChange = (event) => setExpirationDate(event.target.value)

  return (
    <form className="flex flex-col gap-8 p-4" >
      <div className="grid md:grid-cols-2 gap-8 w-full">
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
      </div>
    </form>
  )
};
