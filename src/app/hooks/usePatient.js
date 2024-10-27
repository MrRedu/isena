import { useState } from "react"
import { toast } from "sonner";
import { validateEmail } from "../utils/utils";

const patientInitialState = {
  nombresPaciente: "",
  apellidosPaciente: "",
  cedulaPaciente: "",
  telefonoPaciente: "",
  fechaNacimientoPaciente: "",
  correoPaciente: "",
  direccionPaciente: "",
}

export function usePatient({ initialStatePatients}) {
  const [patients, setPatients] = useState(initialStatePatients || [])
  const [isLoading, setIsLoading] = useState(false)
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
    if(
      !patient.nombresPaciente || 
      !patient.apellidosPaciente || 
      !patient.cedulaPaciente || 
      !patient.fechaNacimientoPaciente || 
      !patient.telefonoPaciente 
    ) return toast.error('Los campos marcados con (*) son obligatorios')


  const isMyEmailValid = validateEmail(patient.correoPaciente)
  if(!isMyEmailValid && patient.correoPaciente) return toast.error('El correo electrónico no es valido')

  patient.cedulaPaciente = patient.cedulaPaciente.trim().replace(/\./g, '');
  patient.telefonoPaciente = patient.telefonoPaciente.trim().replace(/[\s()]/g, '');;

  if (!patient.correoPaciente) patient.correoPaciente = null  
  if (!patient.direccionPaciente) patient.direccionPaciente = null

     try {
      setIsLoading(true)
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
    setPatients(prev => [...prev, {
      nombres: patient.nombresPaciente,
      apellidos: patient.apellidosPaciente,
      cedula: patient.cedulaPaciente,
      telefono: patient.telefonoPaciente,
      fechaNacimiento: patient.fechaNacimientoPaciente,
      correo: patient.correoPaciente,
      direccion: patient.direccionPaciente
    }]);
      
      // setError(null)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
      setPatient(patientInitialState);
    }
  }
  
  const handleReset = () => setPatient(patientInitialState)

  return {
    patients,
    patient,
    isLoading,
    handleChange,
    handleSubmit,
    handleReset
  }
}