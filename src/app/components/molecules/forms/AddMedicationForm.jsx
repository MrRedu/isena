'use client'
import propTypes from 'prop-types'
import { Input } from "@/app/MTailwind";
export const AddMedicationForm = ({ medicamentoState, handleChange }) => {
  return (
    <form className="flex flex-col gap-8 p-4">
      <Input
        name="nombreMedicamento"
        value={medicamentoState?.nombreMedicamento}
        onChange={handleChange}
        type="text"
        variant="static"
        label="Nombre"
        placeholder="ej: Ibuprofeno"
      />
      <Input
        name="dosisMedicamento"
        value={medicamentoState?.dosisMedicamento}
        onChange={handleChange}
        type="text"
        variant="static"
        label="Dosis"
        placeholder="ej: 10 mg"
      />
      <div className="grid md:grid-cols-2 gap-8 w-full">
        <Input
          name="viaAdministracionMedicamento"
          value={medicamentoState?.viaAdministracionMedicamento}
          onChange={handleChange}
          type="text"
          variant="static"
          label="Via de administración"
          placeholder="ej: Oral"
        />
        <Input
          name="intervaloMedicamento"
          value={medicamentoState?.intervaloMedicamento}
          onChange={handleChange}
          type="text"
          variant="static"
          label="Intervalo"
          placeholder="ej: Cada 8 horas"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-8 w-full">
        <Input
          type="date"
          name="fechaInicioMedicamento"
          value={medicamentoState?.fechaInicioMedicamento}
          onChange={handleChange}
          label="Fecha de inicio"
          variant="static" />
        <Input
          type="date"
          name="fechaFinMedicamento"
          value={medicamentoState?.fechaFinMedicamento}
          onChange={handleChange}
          label="Fecha de fin"
          variant="static"
          min={new Date().toISOString().split('T')[0]} />
      </div>
    </form>
  )
};

AddMedicationForm.propTypes = {
  medicamentoState: propTypes.object,
  handleChange: propTypes.func
}
