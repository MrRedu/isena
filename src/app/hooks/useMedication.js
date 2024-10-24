import { useState } from "react"

const medicamentoInitialState = {
  nombreMedicamento: "",
  dosisMedicamento: "",
  intervaloMedicamento: "",
  viaAdministracionMedicamento: "",
  fechaFinMedicamento: "",
  fechaInicioMedicamento: "",
}

export function useMedication() {
  const [medicamentoState, setMedicamentoState] = useState(medicamentoInitialState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setMedicamentoState(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.table(medicamentoState)
  }

  return {
    medicamentoState,
    handleChange,
    handleSubmit
  }
}
