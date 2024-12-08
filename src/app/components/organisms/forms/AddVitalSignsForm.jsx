'use client'
import propTypes from 'prop-types'
import { Input } from '@/app/MTailwind'

export const AddVitalSignsForm = ({ vitalSign, handleChange }) => {
  return (
    <form className="flex flex-col gap-8 p-4">
      <div className="grid md:grid-cols-2 gap-8 w-full">
        <Input
          value={vitalSign?.altura
            .replace(/[^0-9]/g, '') // Permitir solo dígitos y un punto decimal
            .replace(/^0+/, '') // Eliminar ceros iniciales
            .replace(/(\..*)\..*/g, '$1') // Permitir solo un punto decimal
            .replace(
              /^(\d)(\d{0,2})?$/,
              (_, g1, g2) => g1 + (g2 ? '.' + g2 : '')
            ) // Agregar punto después del primer dígito
            .substring(0, 4)} // Limitar a 4 caracteres (ej: 1.70)
          name="altura"
          onChange={handleChange}
          type="text"
          variant="static"
          label="Altura"
          placeholder="ej: 1.70 m"
          maxLength={4}
          required
        />
        <Input
          value={vitalSign?.peso
            .replace(/[^0-9]/g, '') // Permitir solo dígitos y un punto decimal
            .replace(/^0+/, '') // Eliminar ceros iniciales
            .replace(/(\..*)\..*/g, '$1') // Permitir solo un punto decimal
            .replace(
              /^(\d{1,3})(\d{0,2})?$/,
              (_, g1, g2) => g1 + (g2 ? '.' + g2 : '')
            ) // Agregar punto después de 3 dígitos
            .substring(0, 6)} // Limitar a 6 caracteres en total (ej: 123.45)
          name="peso"
          onChange={handleChange}
          type="text"
          variant="static"
          label="Peso"
          placeholder="ej: 70 kg"
          maxLength={6}
          required
        />
      </div>
      <div className="grid md:grid-cols-2 gap-8 w-full">
        <Input
          value={vitalSign?.temperatura
            .replace(/[^0-9]/g, '') // Permitir solo dígitos y un punto decimal
            .replace(/^0+/, '') // Eliminar ceros iniciales
            .replace(/(\..*)\..*/g, '$1') // Permitir solo un punto decimal
            .replace(
              /^(\d{2})(\d{0,2})?$/,
              (_, g1, g2) => g1 + (g2 ? '.' + g2 : '')
            ) // Agregar punto después de dos dígitos
            .substring(0, 5)} // Limitar a 6 caracteres en total (ej: 37.5)
          name="temperatura"
          onChange={handleChange}
          type="text"
          variant="static"
          label="Temperatura"
          placeholder="ej: 37.5 °C"
          maxLength={5}
          required
        />
        <Input
          value={vitalSign?.frecuenciaRespiratoria
            .replace(/[^0-9]/g, '') // Permitir solo dígitos
            .replace(/^0+/, '') // Eliminar ceros iniciales
            .substring(0, 3)} // Limitar a 3 caracteres
          name="frecuenciaRespiratoria"
          onChange={handleChange}
          type="text"
          variant="static"
          label="Frec. Respiratoria"
          placeholder="ej: 12 rpm"
          maxLength={3}
          required
        />
      </div>
      <div className="grid md:grid-cols-2 gap-8 w-full">
        <Input
          value={vitalSign?.presionArterial
            .replace(/[^0-9]/g, '')
            .replace(
              /(\d{3})(\d{0,3})/,
              (_, g1, g2) => g1 + (g2 ? '/' + g2 : '')
            )
            .substring(0, 7)}
          name="presionArterial"
          onChange={handleChange}
          type="text"
          variant="static"
          label="Presión Arterial"
          placeholder="120/80 mmHg"
          maxLength={7}
          pattern="\d{3}/\d{3}"
          labelProps={{
            className: 'before:content-none after:content-none',
          }}
          containerProps={{
            className: '!min-w-0',
          }}
          required
        />
        <Input
          value={vitalSign?.frecuenciaCardiaca
            .replace(/[^0-9]/g, '') // Permitir solo dígitos
            .replace(/^0+/, '') // Eliminar ceros iniciales
            .substring(0, 3)} // Limitar a 3 caracteres
          name="frecuenciaCardiaca"
          onChange={handleChange}
          type="text"
          variant="static"
          label="Frecuencia Cardiaca"
          placeholder="ej: 80 bpm"
          maxLength={3}
          required
        />
      </div>
    </form>
  )
}

AddVitalSignsForm.propTypes = {
  vitalSign: propTypes.object,
  handleChange: propTypes.func,
}
