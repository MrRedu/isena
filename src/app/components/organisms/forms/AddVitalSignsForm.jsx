'use client'
import propTypes from 'prop-types'
import { Input } from '@/app/MTailwind'

// altura: "",
// peso: "",
// temperatura: "",
// frecuenciaRespiratoria: "",
// presionArterial: "",
// frecuenciaCardiaca: "",

export const AddVitalSignsForm = ({ vitalSign, handleChange }) => {
  return (
    <form className="flex flex-col gap-8 p-4">
      <div className="grid md:grid-cols-2 gap-8 w-full">
        <Input
          value={vitalSign?.altura}
          name="altura"
          onChange={handleChange}
          type="text"
          variant="static"
          label="Altura"
          placeholder="ej: 1.70 m"
        />
        <Input
          value={vitalSign?.peso}
          name="peso"
          onChange={handleChange}
          type="text"
          variant="static"
          label="Peso"
          placeholder="ej: 70 kg"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-8 w-full">
        <Input
          value={vitalSign?.temperatura}
          name="temperatura"
          onChange={handleChange}
          type="text"
          variant="static"
          label="Temperatura"
          placeholder="ej: 37.5 °C"
        />
        <Input
          value={vitalSign?.frecuenciaRespiratoria}
          name="frecuenciaRespiratoria"
          onChange={handleChange}
          type="text"
          variant="static"
          label="Frec. Respiratoria"
          placeholder="ej: 12 rpm"
          maxLength={3}
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
        />
        <Input
          value={vitalSign?.frecuenciaCardiaca}
          name="frecuenciaCardiaca"
          onChange={handleChange}
          type="text"
          variant="static"
          label="Frecuencia Cardiaca"
          placeholder="ej: 80 bpm"
          maxLength={3}
        />
      </div>
    </form>
  )
}

AddVitalSignsForm.propTypes = {
  vitalSign: propTypes.object,
  handleChange: propTypes.func,
}
