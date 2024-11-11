'use client'
import propTypes from 'prop-types'
import { Button, Input, Option, Select } from '@/app/MTailwind';
export const ProfileInformationForm = () => {

  const name = "Hacer el fetch"
  const lastName = "Hacer el fetch"
  const rol = "Hacer el fetch"
  const email = "Hacer el fetch"
  const status = "Hacer el fetch"

  return (
    <>
      <form action="" className='mt-16'>
        <div className="flex flex-col gap-8">
          <div className="flex gap-8 flex-col lg:flex-row">
            <Input
              id="name"
              name="name"
              type="text"
              variant="static"
              // onChange={handleChange}
              value={name}
              label="Nombres"
              className="w-full "
            />
            <Input
              id="lastName"
              name="lastName"
              type="text"
              variant="static"
              value={lastName}
              label="Apellidos"
              className="w-full"
            />
          </div>
          <Input
            id="email"
            name="email"
            type="email"
            variant="static"
            // onChange={handleChange}
            value={email}
            label="Correo electrónico"
            placeholder="ejemplo@gmail.com"
          />
          <div className="flex gap-8 flex-col lg:flex-row">
            <Select variant="static" label="Rol" value={rol || 'Médico'} >
              <Option disabled>{rol || 'Médico'}</Option>
            </Select>
            <Select variant="static" label="Status" value={status || 'Habilitado'}>
              <Option disabled>Habilitado</Option>
              <Option disabled>Deshabilitado</Option>
            </Select>
          </div>
          <Button
            color="blush"
            fullWidth
            className='mt-4'
          // enabled cuando hayan cambios, si no, no.
          >
            Guardar cambios
          </Button>
        </div>
      </form>
    </>
  )
};

ProfileInformationForm.propTypes = {
  name: propTypes.string,
  lastName: propTypes.string,
  rol: propTypes.string,
  email: propTypes.string,
  status: propTypes.string,
}