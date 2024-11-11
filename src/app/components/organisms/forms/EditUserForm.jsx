'use client'
import { Input, Option, Select, Switch, Typography } from "@/app/MTailwind";
import { useState } from "react";

export const EditUserForm = () => {
  const [status, setStatus] = useState(true)
  const handleChange = () => setStatus(!status)

  return (
    <form className="flex flex-col gap-8 p-4">
      <div className="flex gap-8 flex-col lg:flex-row">
        <Input type="text" variant="static" label="Nombres" readOnly />
        <Input type="text" variant="static" label="Apellidos" readOnly />
      </div>
      <Input type="text" variant="static" label="Correo electrónico" readOnly />
      <Select variant="static" label="Seleccionar rol" >
        <Option>Administrador</Option>
        <Option>Desarrollador</Option>
        <Option>Médico</Option>
        <Option>Visualizador</Option>
      </Select>
      <div className="flex flex-col gap-4">
        <Typography className="text-sm">Status</Typography>
        <Switch checked={status} onChange={handleChange} label={status ? "Deshabilitar" : "Habilitar"} />
      </div>
    </form>
  )
};
