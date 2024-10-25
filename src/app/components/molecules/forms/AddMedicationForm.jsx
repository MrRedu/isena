'use client'
import propTypes from 'prop-types'
import { Input } from "@/app/MTailwind";
export const AddMedicationForm = ({ medicationState, handleChange }) => {
  return (
    <form className="flex flex-col gap-8 p-4" >
      <Input
        name="nombreMedicamento"
        value={medicationState?.nombreMedicamento}
        onChange={handleChange}
        type="text"
        variant="static"
        label="Nombre"
        placeholder="ej: Ibuprofeno"
        required
      />
      <Input
        name="dosisMedicamento"
        value={medicationState?.dosisMedicamento}
        onChange={handleChange}
        type="text"
        variant="static"
        label="Dosis"
        placeholder="ej: 10 mg"
        required
      />
      <div className="grid md:grid-cols-2 gap-8 w-full">
        <Input
          name="viaAdministracionMedicamento"
          value={medicationState?.viaAdministracionMedicamento}
          onChange={handleChange}
          type="text"
          variant="static"
          label="Via de administración"
          placeholder="ej: Oral"
          required
        />
        <Input
          name="intervaloMedicamento"
          value={medicationState?.intervaloMedicamento}
          onChange={handleChange}
          type="text"
          variant="static"
          label="Intervalo"
          placeholder="ej: Cada 8 horas"
          required
        />
      </div>
      <div className="grid md:grid-cols-2 gap-8 w-full">
        <Input
          type="date"
          name="fechaInicioMedicamento"
          value={medicationState?.fechaInicioMedicamento}
          onChange={handleChange}
          label="Fecha de inicio"
          variant="static"
          required
        />
        <Input
          type="date"
          name="fechaFinMedicamento"
          value={medicationState?.fechaFinMedicamento}
          onChange={handleChange}
          label="Fecha de fin"
          variant="static"
          min={new Date().toISOString().split('T')[0]} />
      </div>
    </form>
  )
};

AddMedicationForm.propTypes = {
  medicationState: propTypes.object,
  handleChange: propTypes.func,
}
