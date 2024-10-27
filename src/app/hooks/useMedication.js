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
  const [medications, setMedications] = useState(medicamentos || [])
  const [medication, setMedication] = useState(medicationInitialState)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setMedication(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !medication.nombreMedicamento || 
      !medication.dosisMedicamento || 
      !medication.intervaloMedicamento || 
      !medication.viaAdministracionMedicamento || 
      !medication.fechaInicioMedicamento
    ) return toast.error('Todos los campos son obligatorios')

    if (!medication.fechaFinMedicamento) {
      medication.fechaFinMedicamento = null
    }

    try {
      setIsLoading(true)
      const response = await fetch(`http://localhost:3000/api/medications/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...medication,
          idPaciente,
        }),
      })

      if (!response.ok) {
        throw new Error('Error al registrar el medicamento')
      }

    toast.success('Medicamento registrado exitosamente');
    setMedications(prev => [...prev, {
      nombre_medicamento: medication.nombreMedicamento,
      dosis_medicamento: medication.dosisMedicamento,
      intervalo_medicamento: medication.intervaloMedicamento,
      via_administracion_medicamento: medication.viaAdministracionMedicamento,
      fecha_inicio_medicamento: medication.fechaInicioMedicamento,
      fecha_fin_medicamento: medication.fechaFinMedicamento,
    }]);

      // setError(null)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
      setMedication(medicationInitialState);
    }
  }

  const handleDelete = async (id) => {
     deleteMedication(id)
     setMedications(medications.filter(medication => medication.id_medicamento !== id))
  }
  
  return {
    medications,
    medication,
    handleChange,
    handleSubmit,
    isLoading,
    handleDelete
  }
}
