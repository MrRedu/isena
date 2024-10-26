import { useState } from "react"
import { toast } from "sonner"
import { deleteMedication } from "@/services/medications"

const medicationInitialState = {
  nombreMedicamento: "",
  dosisMedicamento: "",
  intervaloMedicamento: "",
  viaAdministracionMedicamento: "",
  fechaInicioMedicamento: "",
  fechaFinMedicamento: "",
}

export function useMedication({idPaciente, medicamentos}) {
  const [medicationsState, setMedicationsState] = useState(medicamentos || [])
  const [medicationState, setMedicationState] = useState(medicationInitialState)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setMedicationState(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !medicationState.nombreMedicamento || 
      !medicationState.dosisMedicamento || 
      !medicationState.intervaloMedicamento || 
      !medicationState.viaAdministracionMedicamento || 
      !medicationState.fechaInicioMedicamento
    ) return toast.error('Todos los campos son obligatorios')

    if (!medicationState.fechaFinMedicamento) {
      medicationState.fechaFinMedicamento = null
    }

    try {
      setIsLoading(true)
      const response = await fetch(`http://localhost:3000/api/medications/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...medicationState,
          idPaciente,
        }),
      })

      if (!response.ok) {
        throw new Error('Error al registrar el medicamento')
      }

    toast.success('Medicamento registrado exitosamente');
      

      // setError(null)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
      setMedicationsState(prev => [...prev, {
        nombre_medicamento: medicationState.nombreMedicamento,
        dosis_medicamento: medicationState.dosisMedicamento,
        intervalo_medicamento: medicationState.intervaloMedicamento,
        via_administracion_medicamento: medicationState.viaAdministracionMedicamento,
        fecha_inicio_medicamento: medicationState.fechaInicioMedicamento,
        fecha_fin_medicamento: medicationState.fechaFinMedicamento,
      }]);
      setMedicationState(medicationInitialState);
    }
  }

  const handleDelete = async (id) => {
     deleteMedication(id)
     setMedicationsState(medicationsState.filter(medication => medication.id_medicamento !== id))
  }
  

  return {
    medicationsState,
    medicationState,
    handleChange,
    handleSubmit,
    isLoading,
    handleDelete
  }
}
