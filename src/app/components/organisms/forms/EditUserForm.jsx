'use client'
import { Option, Select, Switch } from "@/app/MTailwind";

export const EditUserForm = () => {
  return (
    <form className="flex flex-col gap-8 p-4">
      <Select variant="static" label="Seleccionar rol">
        <Option>Administrador</Option>
        <Option>Desarrollador</Option>
        <Option>Médico</Option>
        <Option>Visualizador</Option>
      </Select>
      <Switch label="Habilitar" />
    </form>
  )
};
