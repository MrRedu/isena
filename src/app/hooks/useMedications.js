import { toast } from "sonner"
import { useEffect, useState } from "react"
import { deleteMedication, getMedicationsByCedula } from "@/services/medications"
import { medicationInitialState } from "@/utils/consts"

export function useMedications({cedulaPaciente}) {
  const [medications, setMedications] = useState([])
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
    ) return toast.error('Los campos marcados con (*) son obligatorios')

    const payload = {
      ...medication,
      cedulaPaciente,
      fechaFinMedicamento: medication.fechaFinMedicamento === "" ? null : medication.fechaFinMedicamento // Convertir cadena vacía a null
    };

    try {
      setIsLoading(true)
      const response = await fetch(`http://localhost:3000/api/medications/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Error al registrar el medicamento')
      }

      // Success
      const data = await response.json()
      setMedications([...medications, {
        id_medicamento: data.idMedicamento,
        nombre_medicamento :medication.nombreMedicamento,
        dosis_medicamento :medication.dosisMedicamento,
        via_administracion_medicamento :medication.viaAdministracionMedicamento,
        intervalo_medicamento :medication.intervaloMedicamento,
        fecha_inicio_medicamento:medication.fechaInicioMedicamento,
        fecha_fin_medicamento:medication.fechaFinMedicamento
      }])

      toast.success('Medicamento registrado exitosamente');
  } catch (error) {
      // setError(null)
      console.error('Error:', error)
      toast.error('Error al registrar el medicamento');
      throw new Error('Error al registrar el medicamento')
    } finally {
      setIsLoading(false)
      handleReset()
    }
  }

  const handleDelete = async (id) => {
     deleteMedication(id)
     setMedications(medications.filter(medication => medication.id_medicamento !== id))
  }

  const handleReset = () => setMedication(medicationInitialState)

  const getMedications = async ({ cedulaPaciente }, { signal }) => {
    try {
      setIsLoading(true)
      const { data } = await getMedicationsByCedula(
        { cedulaPaciente },
        { signal }
      )
      setMedications(data)
    } catch (error) {
      console.error("Error fetching medications:", error);
      // toast.error('Error al obtener medicamentos'); // Mensaje para el usuario
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    getMedications({ cedulaPaciente }, { signal: abortController.signal })
    
    return () => abortController.abort()
  }, [  ])
  
  return {
    medications,
    medication,
    handleChange,
    handleSubmit,
    isLoading,
    handleDelete,
    handleReset
  }
}
