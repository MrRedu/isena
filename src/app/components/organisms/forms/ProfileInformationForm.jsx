'use client'
import propTypes from 'prop-types'
import { Button, Input } from '@/app/MTailwind'
import { useProfile } from '@/hooks/useProfile'
export const ProfileInformationForm = ({ emailUser }) => {
  const { user, isChanged, handleChange, handleSubmit, isLoading } = useProfile(
    { emailUser }
  )

  return (
    <>
      <form action="" className="mt-12">
        <div className="flex flex-col gap-8">
          <div className="flex gap-8 flex-col lg:flex-row">
            <Input
              id="name"
              name="name"
              type="text"
              variant="static"
              onChange={handleChange}
              value={user?.name}
              label="Nombres"
              className="w-full "
            />
            <Input
              id="lastName"
              name="lastName"
              type="text"
              variant="static"
              onChange={handleChange}
              value={user?.lastName}
              label="Apellidos"
              className="w-full"
            />
          </div>
          <Input
            id="email"
            name="email"
            type="email"
            variant="static"
            value={user?.email}
            readOnly
            label="Correo electrónico"
            placeholder="ejemplo@gmail.com"
          />
          <div className="flex gap-8 flex-col lg:flex-row">
            <Input
              variant="static"
              label="Rol"
              id="rol"
              name="rol"
              value={user?.rol}
              readOnly
            />
            <Input
              variant="static"
              label="Status"
              value={user?.status}
              name="status"
              id="status"
              readOnly
            />
          </div>
          <Button
            color="blush"
            fullWidth
            className={`w-full mt-4`}
            disabled={!isChanged}
            loading={isLoading}
            onClick={handleSubmit}
          >
            {`Actualizar datos`}
          </Button>
        </div>
      </form>
    </>
  )
}

ProfileInformationForm.propTypes = {
  emailUser: propTypes.string,
}
