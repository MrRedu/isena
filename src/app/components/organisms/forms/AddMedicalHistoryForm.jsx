import propTypes from 'prop-types'
import { Input, Option, Select, Typography } from "@/app/MTailwind";
import { Controller } from 'react-hook-form';

const tiposAntecedentes = [
  { value: 1, name: 'Patológicos' },
  { value: 2, name: 'Heredofamiliares' },
  { value: 3, name: 'No patológicos' },
  { value: 4, name: 'Alergias' }
]

export const AddMedicalHistoryForm = ({
  register,
  errors,
  onSubmit,
  control
}) => {
  return (
    <form className="flex flex-col gap-8 p-4" onSubmit={onSubmit}>
      <div>
        <Controller
          name="type"
          control={control}
          rules={{ required: 'El tipo de antecedente es requerido' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Select
              label="Selecciona el tipo de antecedente"
              variant="static"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              error={!!errors.type}
            >
              {tiposAntecedentes.map(({ value, name }) => (
                <Option key={value} value={value}>
                  {name}
                </Option>
              ))}
            </Select>
          )}
        />
        {errors.type && (
          <Typography
            color="red"
            className="mt-3 flex items-center gap-2 text-xs font-normal"
          >
            {errors.type.message}
          </Typography>
        )}
      </div>

      <div>
        <Input
          type="text"
          variant="static"
          label="Título"
          placeholder="ej: Diabetes"
          {...register("title", {
            required: 'El titulo es requerido',
            minLength: { value: 3, message: 'El titulo debe tener al menos 3 caracteres' }
          })}
          required
          error={!!errors.title}
        />
        {errors.title && (
          <Typography
            color="red"
            className="mt-3 flex items-center gap-2 text-xs font-normal"
          >
            {errors.title.message}
          </Typography>
        )}
      </div>
      <div>
        <Input
          type="text"
          variant="static"
          label="Descripción"
          placeholder="ej: Tipo II"
          {...register("description", {
            required: 'La descripcion es requerida',
            minLength: { value: 3, message: 'La descripción debe tener al menos 3 caracteres' }
          })}
          required
          error={!!errors.description}
        />
        {errors.description && (
          <Typography
            color="red"
            className="mt-3 flex items-center gap-2 text-xs font-normal"
          >
            {errors.description.message}
          </Typography>
        )}
      </div>
    </form>
  )
};

AddMedicalHistoryForm.propTypes = {
  register: propTypes.func,
  errors: propTypes.object,
  onSubmit: propTypes.func,
  control: propTypes.object
}