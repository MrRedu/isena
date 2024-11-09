import propTypes from 'prop-types'
import { Input } from '@/app/MTailwind';
export const ProfileInformationForm = ({ name, lastName, rol, email, status }) => {
  return (
    <>
      {/* <!-- Card --> */}
      <form action="" className='my-6'>
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
              required
              className="w-full "
            />
            <Input
              id="lastName"
              name="lastName"
              type="text"
              variant="static"
              value={lastName}
              readOnly
              label="Apellidos"
              required
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
        </div>
      </form>
      <p>{rol || 'Médico'}</p>
      <p>{status || 'Habilitado'}</p>
    </>
  )
};

