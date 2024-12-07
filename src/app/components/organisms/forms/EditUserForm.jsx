'use client'
import propTypes from 'prop-types'
import { Input, Option, Select, Switch, Typography } from '@/app/MTailwind'

export const EditUserForm = ({ user, handleStatus, handleRol }) => {
  if (
    user.correo === 'administrador@adm.com' ||
    user.correo === 'desarrollador@dev.com' ||
    user.correo === 'visualizador@vis.com' ||
    user.correo === 'medico@med.com'
  ) {
    return (
      <Typography variant="h3" className="text-center">
        Este usuario pertenece al sistema, no puede ser modificado.
      </Typography>
    )
  }

  return (
    <form className="flex flex-col gap-8 p-4">
      <div className="flex gap-8 flex-col lg:flex-row">
        <Input
          type="text"
          variant="static"
          label="Nombres"
          value={user?.nombres}
          readOnly
        />
        <Input
          type="text"
          variant="static"
          label="Apellidos"
          value={user?.apellidos}
          readOnly
        />
      </div>
      <Input
        type="text"
        variant="static"
        label="Correo electrónico"
        value={user?.correo}
        readOnly
      />
      <Select
        variant="static"
        label="Seleccionar rol"
        value={user?.rol}
        onChange={value => handleRol(value)}
      >
        <Option value="Administrador">Administrador</Option>
        <Option value="Desarrollador">Desarrollador</Option>
        <Option value="Médico">Médico</Option>
        <Option value="Visualizador">Visualizador</Option>
      </Select>
      <div className="flex flex-col gap-4">
        <Typography className="text-sm">Status</Typography>
        <Switch
          label={user?.status === 'Habilitado' ? 'Deshabilitar' : 'Habilitar'}
          checked={user?.status === 'Habilitado' ? true : false}
          onChange={handleStatus}
        />
      </div>
    </form>
  )
}

EditUserForm.propTypes = {
  user: propTypes.object,
  handleStatus: propTypes.func,
  handleRol: propTypes.func,
}
