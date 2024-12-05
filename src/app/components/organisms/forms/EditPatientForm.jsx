import propTypes from 'prop-types'
import { Input, Textarea, Typography } from '@/app/MTailwind'
import { eighteenYearsBefore } from '@/utils/utils'
export const EditPatientForm = ({ register, onSubmit, errors }) => {
  return (
    <form className="flex flex-col gap-8 p-4" onSubmit={onSubmit}>
      <div className="grid md:grid-cols-2 gap-8 w-full">
        <div>
          <Input
            type="text"
            variant="static"
            label="Nombres"
            required
            {...register('nombresPaciente', {
              required: 'Los nombres son requeridos',
              pattern: {
                value: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/,
                message: 'Los nombres deben contener solo letras y espacios',
              },
              maxLength: {
                value: 64,
                message: 'Los nombres deben tener un máximo de 64 caracteres',
              },
              minLength: {
                value: 2,
                message: 'Los nombres deben tener un mínimo de 2 caracteres',
              },
            })}
            error={errors.nombresPaciente}
          />
          {errors.nombresPaciente && (
            <Typography
              color="red"
              className="mt-3 flex items-center gap-2 text-xs font-normal"
            >
              {errors.nombresPaciente.message}
            </Typography>
          )}
        </div>
        <div>
          <Input
            name="apellidosPaciente"
            type="text"
            variant="static"
            label="Apellidos"
            required
            {...register('apellidosPaciente', {
              required: 'Los apellidos son requeridos',
              pattern: {
                value: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/,
                message: 'Los apellidos deben contener solo letras y espacios',
              },
              maxLength: {
                value: 64,
                message: 'Los apellidos deben tener un máximo de 64 caracteres',
              },
              minLength: {
                value: 2,
                message: 'Los apellidos deben tener un mínimo de 2 caracteres',
              },
            })}
            error={errors.apellidosPaciente}
          />
          {errors.apellidosPaciente && (
            <Typography
              color="red"
              className="mt-3 flex items-center gap-2 text-xs font-normal"
            >
              {errors.apellidosPaciente.message}
            </Typography>
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8 w-full">
        <div>
          <Input
            type="text"
            variant="static"
            name="cedulaPaciente"
            label="Cédula"
            placeholder="12.345.678"
            required
            readOnly
            {...register('cedulaPaciente', {
              required: 'La cedula es requerida',
              pattern: {
                value: /^[0-9]+$/,
                message: 'La cedula debe contener solo números',
              },
              maxLength: {
                value: 10,
                message: 'La cedula debe tener un máximo de 10 caracteres',
              },
            })}
            error={errors.cedulaPaciente}
          />
          {errors.cedulaPaciente && (
            <Typography
              color="red"
              className="mt-3 flex items-center gap-2 text-xs font-normal"
            >
              {errors.cedulaPaciente.message}
            </Typography>
          )}
        </div>
        <div>
          <Input
            type="date"
            name="fechaNacimientoPaciente"
            label="Fecha de nacimiento"
            variant="static"
            max={eighteenYearsBefore}
            {...register('fechaNacimientoPaciente', {
              required: 'La fecha de nacimiento es requerida',
              validate: value => {
                const today = new Date()
                const birthDate = new Date(value)
                const age = today.getFullYear() - birthDate.getFullYear()
                if (age < 18) {
                  return 'El paciente debe ser mayor de 16 años'
                }
              },
            })}
            required
            error={errors.fechaNacimientoPaciente}
          />
          {errors.fechaNacimientoPaciente && (
            <Typography
              color="red"
              className="mt-3 flex items-center gap-2 text-xs font-normal"
            >
              {errors.fechaNacimientoPaciente.message}
            </Typography>
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8 w-full">
        <div>
          <Input
            type="text"
            variant="static"
            name="telefonoPaciente"
            label="Número de Teléfono"
            required
            {...register('telefonoPaciente', {
              required: 'El telefono es requerido',
              pattern: {
                value: /^[0-9]+$/,
                message: 'El teléfono debe contener solo números',
              },
              maxLength: {
                value: 11,
                message: 'El teléfono debe tener un máximo de 11 caracteres',
              },
            })}
            placeholder="(0414) 123-45-67"
            error={errors.telefonoPaciente}
          />
          {errors.telefonoPaciente && (
            <Typography
              color="red"
              className="mt-3 flex items-center gap-2 text-xs font-normal"
            >
              {errors.telefonoPaciente.message}
            </Typography>
          )}
        </div>

        <div>
          <Input
            name="correoPaciente"
            type="text"
            variant="static"
            label="Correo electrónico"
            placeholder="ej: correo@ejemplo.com"
            {...register('correoPaciente', {
              maxLength: {
                value: 64,
                message: 'El correo debe tener un máximo de 64 caracteres',
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'El correo no es válido',
              },
            })}
            error={errors.correoPaciente}
          />
          {errors.correoPaciente && (
            <Typography
              color="red"
              className="mt-3 flex items-center gap-2 text-xs font-normal"
            >
              {errors.correoPaciente.message}
            </Typography>
          )}
        </div>
      </div>
      <Textarea
        name="direccionPaciente"
        variant="static"
        label="Dirección física"
        placeholder="ej: Entre la calle Mariño y la Av. Santos Michelena de la ciudad de Maracay, estado Aragua"
        {...register('direccionPaciente', {
          maxLength: {
            value: 255,
            message: 'La dirección debe tener un máximo de 255 caracteres',
          },
        })}
      />
    </form>
  )
}
EditPatientForm.propTypes = {
  patient: propTypes.object,
  register: propTypes.func,
  onSubmit: propTypes.func,
  errors: propTypes.object,
  reset: propTypes.func,
}
