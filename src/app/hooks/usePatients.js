import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { validateEmail } from '@/utils/utils'
import { patientInitialState } from '@/utils/consts'
import { getPatientByCedula } from '../services/patients'

export function usePatients({ initialStatePatients }) {
  const [patients, setPatients] = useState(initialStatePatients || [])
  const [patient, setPatient] = useState(patientInitialState)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setPatient({
      ...patient,
      [name]: value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // #TODO: Validations
    if (
      !patient.nombresPaciente ||
      !patient.apellidosPaciente ||
      !patient.cedulaPaciente ||
      !patient.fechaNacimientoPaciente ||
      !patient.telefonoPaciente
    )
      return toast.error('Los campos marcados con (*) son obligatorios')

    const isMyEmailValid = validateEmail(patient.correoPaciente)
    if (!isMyEmailValid && patient.correoPaciente)
      return toast.error('El correo electrónico no es valido')

    patient.cedulaPaciente = patient.cedulaPaciente.trim().replace(/\./g, '')
    patient.telefonoPaciente = patient.telefonoPaciente
      .trim()
      .replace(/[\s()]/g, '')

    if (!patient.correoPaciente) patient.correoPaciente = null
    if (!patient.direccionPaciente) patient.direccionPaciente = null

    try {
      setIsLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/patients/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(patient),
        }
      )

      if (!response.ok) {
        throw new Error('Error al registrar el paciente')
      }

      toast.success('Paciente registrado exitosamente')
      setPatients(prev => [
        ...prev,
        {
          nombres: patient.nombresPaciente,
          apellidos: patient.apellidosPaciente,
          cedula: patient.cedulaPaciente,
          telefono: patient.telefonoPaciente,
          fechaNacimiento: patient.fechaNacimientoPaciente,
          correo: patient.correoPaciente,
          direccion: patient.direccionPaciente,
        },
      ])

      // setError(null)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
      setPatient(patientInitialState)
    }
  }

  const handleReset = () => setPatient(patientInitialState)

  return {
    patients,
    patient,
    isLoading,
    handleChange,
    handleSubmit,
    handleReset,
  }
}

export function usePatient({ cedulaPaciente }) {
  const [patient, setPatient] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const getPatient = async ({ cedulaPaciente }, { signal }) => {
    try {
      setIsLoading(true)
      const { data } = await getPatientByCedula(
        { cedula: cedulaPaciente },
        { signal }
      )

      const dataMapped = {
        nombres: data.nombres_paciente,
        apellidos: data.apellidos_paciente,
        cedula: data.cedula_paciente,
        fechaNacimiento: data.fecha_nacimiento_paciente,
        telefono: data.telefono_paciente,
        correo: data.correo_paciente,
        direccion: data.direccion_paciente,
      }

      setPatient(dataMapped)
    } catch (error) {
      console.error('Error fetching patient:', error)
      // toast.error('Error al obtener X'); // Mensaje para el usuario
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    getPatient({ cedulaPaciente }, { signal: abortController.signal })

    return () => abortController.abort()
  }, [cedulaPaciente])

  return {
    patient,
    isLoading,
  }
}
