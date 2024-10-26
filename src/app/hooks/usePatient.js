import { useState } from "react"
import { toast } from "sonner";

const patientInitialState = {
  nombresPaciente: "",
  apellidosPaciente: "",
  cedulaPaciente: "",
  telefonoPaciente: "",
  fechaNacimientoPaciente: "",
  correoPaciente: "",
  direccionPaciente: "",
}

export function usePatient() {
  const [patient, setPatient] = useState(patientInitialState)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({
      ...patient,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // #TODO: Validations

    try {
      // setIsLoading(true)
      const response = await fetch(`http://localhost:3000/api/patients/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patient),
      })

      if (!response.ok) {
        throw new Error('Error al registrar el paciente')
      }

    toast.success('Paciente registrado exitosamente');
      

      // setError(null)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      // setIsLoading(false)
      // setMedications(prev => [...prev, {
      //   nombre_medicamento: medication.nombreMedicamento,
      //   dosis_medicamento: medication.dosisMedicamento,
      //   intervalo_medicamento: medication.intervaloMedicamento,
      //   via_administracion_medicamento: medication.viaAdministracionMedicamento,
      //   fecha_inicio_medicamento: medication.fechaInicioMedicamento,
      //   fecha_fin_medicamento: medication.fechaFinMedicamento,
      // }]);
      // setMedication(medicationInitialState);
    }
  }
  
  const handleReset = () => setPatient(patientInitialState)

  return {
     patient,
    handleChange,
    handleSubmit,
    handleReset
  }
}