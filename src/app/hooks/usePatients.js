import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { validateEmail } from '@/utils/utils'
import { patientInitialState } from '@/utils/consts'
import { deletePatient, getPatientByCedula } from '@/services/patients'
import { useForm } from 'react-hook-form'

export function usePatients({ initialStatePatients, handleOpenModal }) {
  const [patients, setPatients] = useState(initialStatePatients || [])
  const [patient, setPatient] = useState(patientInitialState)
  const [isLoading, setIsLoading] = useState(false)

  const [filter, setFilter] = useState('')
  const handleFilterChange = e => {
    setFilter(e.target.value)
  }

  // TODO: Mejorar esto con memo, etc
  const filteredPatients = patients.filter(patient =>
    patient.cedula?.toString().toLowerCase().includes(filter.toLowerCase())
  )

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
      handleOpenModal()
      // setError(null)
    } catch (error) {
      console.error('Error:', error)
      throw new Error('Error al registrar el paciente')
    } finally {
      setIsLoading(false)
      setPatient(patientInitialState)
    }
  }

  const handleDelete = async cedula => {
    deletePatient(cedula)
    setPatients(prev => prev.filter(patient => patient.cedula !== cedula))
  }

  const handleReset = () => setPatient(patientInitialState)

  return {
    patients: filteredPatients,
    patient,
    isLoading,
    handleChange,
    handleSubmit,
    handleReset,
    filterString: filter,
    handleFilterChange,
    handleDelete,
  }
}

export function usePatient({ cedulaPaciente, handleCloseModal }) {
  const [patient, setPatient] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      nombresPaciente: '',
      apellidosPaciente: '',
      cedulaPaciente: '',
      telefonoPaciente: '',
      fechaNacimientoPaciente: '',
      correoPaciente: '',
      direccionPaciente: '',
    },
  })

  useEffect(() => {
    if (patient) {
      reset({
        nombresPaciente: patient.name,
        apellidosPaciente: patient.lastName,
        cedulaPaciente: patient.dni,
        telefonoPaciente: patient.phone,
        fechaNacimientoPaciente: patient.birthDate.slice(0, 10),
        correoPaciente: patient.email,
        direccionPaciente: patient.address,
      })
    }
  }, [patient, reset])

  const onSubmit = handleSubmit(async data => {
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/patients/${cedulaPaciente}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )

      if (!result.ok) {
        throw new Error('Error al actualizar el paciente')
      }

      toast.success('Paciente actualizado exitosamente')

      const updatedPatient = {
        ...patient,
        name: data.nombresPaciente,
        lastName: data.apellidosPaciente,
        dni: data.cedulaPaciente,
        phone: data.telefonoPaciente,
        birthDate: data.fechaNacimientoPaciente,
        email: data.correoPaciente,
        address: data.direccionPaciente,
      }
      handleCloseModal()
      setPatient(updatedPatient)
    } catch (error) {
      console.error('Error:', error)
      throw new Error('Error al actualizar el paciente')
    } finally {
      // setIsLoading(false)
    }
  })

  const getPatient = async ({ cedulaPaciente }, { signal }) => {
    try {
      setIsLoading(true)
      const { data } = await getPatientByCedula(
        { cedula: cedulaPaciente },
        { signal }
      )

      const dataMapped = {
        name: data.nombres_paciente,
        lastName: data.apellidos_paciente,
        dni: data.cedula_paciente,
        birthDate: data.fecha_nacimiento_paciente,
        phone: data.telefono_paciente,
        email: data.correo_paciente,
        address: data.direccion_paciente,
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
    register,
    onSubmit,
    errors,
  }
}
