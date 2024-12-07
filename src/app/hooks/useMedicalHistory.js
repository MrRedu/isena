import { useEffect, useState } from 'react'
import { getMedicalHistoryByCedula } from '@/services/medicalHistory'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const tiposAntecedentes = [
  { value: 1, name: 'Patológicos' },
  { value: 2, name: 'Heredofamiliares' },
  { value: 3, name: 'No patológicos' },
  { value: 4, name: 'Alergias' },
]

export function useMedicalHistory({ cedulaPaciente, handleOpenModal }) {
  const { register, handleSubmit, formState, control } = useForm()
  const [medicalHistory, setMedicalHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getMedicalHistory = async ({ cedulaPaciente }, { signal }) => {
    try {
      setIsLoading(true)
      const { data } = await getMedicalHistoryByCedula(
        { cedulaPaciente },
        { signal }
      )
      setMedicalHistory(data)
    } catch (error) {
      console.error('Error fetching medical history:', error)
      // toast.error('Error al obtener X'); // Mensaje para el usuario
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = handleSubmit(async data => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/patients/${cedulaPaciente}/medical-history`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )

      if (!response.ok) throw new Error('Error al registrar los signos vitales')

      toast.success('Antecedente registrado exitosamente')
      setMedicalHistory(prev => [
        ...prev,
        {
          id_antecedente: data.id,
          titulo: data.title,
          descripcion: data.description,
          id_tipo_antecedente: data.type,
          tipo_antecedente: tiposAntecedentes.find(
            ({ value }) => value === data.type
          ).name,
        },
      ])
      handleOpenModal()
    } catch (error) {
      console.error('Error:', error)
      throw new Error('Error creating medical history')
    } finally {
      setIsLoading(false)
    }
  })

  useEffect(() => {
    const abortController = new AbortController()
    getMedicalHistory({ cedulaPaciente }, { signal: abortController.signal })

    return () => abortController.abort()
  }, [cedulaPaciente])

  return {
    medicalHistory,
    isLoading,

    register,
    handleSubmit,
    errors: formState.errors,
    control,
    onSubmit,
  }
}
