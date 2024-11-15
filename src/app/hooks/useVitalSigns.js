import { useEffect, useState } from 'react'
import { getVitalSignsByCedula } from '@/services/vitalSigns'
import { vitalSignInitialState } from '@/utils/consts'
import { toast } from 'sonner'

export function useVitalSigns({ cedulaPaciente, handleOpenModal }) {
  const [vitalSigns, setVitalSigns] = useState({
    pesos: [],
    alturas: [],
    temperaturas: [],
    frecuencias_cardiacas: [],
    frecuencias_respiratorias: [],
    presiones_arteriales: [],
  })

  const [vitalSign, setVitalSign] = useState(vitalSignInitialState)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setVitalSign(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (
      !vitalSign.peso ||
      !vitalSign.altura ||
      !vitalSign.temperatura ||
      !vitalSign.frecuenciaCardiaca ||
      !vitalSign.frecuenciaRespiratoria ||
      !vitalSign.presionArterial
    )
      return toast.error('Los campos marcados con (*) son obligatorios')

    if (vitalSign.temperatura.length < 5)
      return toast.error('La temperatura no puede tener menos de 4 caracteres')

    if (vitalSign.presionArterial.length < 6)
      return toast.error(
        'La presión arterial no puede tener menos de 5 caracteres'
      )

    /*
     * TODO:
     * Que solo se pueda agregar un registro cada 8h
     * Get del último registro --> Tomar la fecha y compararla con la actual
     * Si la diferencia es menor a 8h, no se puede agregar
     */

    const payload = {
      ...vitalSign,
      presionArterial: {
        sistolica: vitalSign.presionArterial.split('/')[0],
        diastolica: vitalSign.presionArterial.split('/')[1],
      },
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/patients/${cedulaPaciente}/vital-signs`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      )

      if (!response.ok) throw new Error('Error al registrar los signos vitales')

      // Success
      toast.success('Signos vitales registrados con éxito')
      setVitalSigns(prev => ({
        ...prev,
        pesos: [...(prev.pesos || []), { valor: vitalSign.peso }],
        alturas: [...(prev.alturas || []), { valor: vitalSign.altura }],
        temperaturas: [
          ...(prev.temperaturas || []),
          { valor: vitalSign.temperatura },
        ],
        frecuencias_cardiacas: [
          ...(prev.frecuencias_cardiacas || []),
          { valor: vitalSign.frecuenciaCardiaca },
        ],
        frecuencias_respiratorias: [
          ...(prev.frecuencias_respiratorias || []),
          { valor: vitalSign.frecuenciaRespiratoria },
        ],
        presiones_arteriales: [
          ...(prev.presiones_arteriales || []),
          {
            sistolica: vitalSign.presionArterial.split('/')[0],
            diastolica: vitalSign.presionArterial.split('/')[1],
          },
        ],
      }))
      handleOpenModal()
    } catch (error) {
      console.error('Error:', error)
      throw new Error('Error creating vital sign')
    } finally {
      setVitalSign(vitalSignInitialState)
      setIsLoading(false)
    }

    console.table(vitalSign)
  }

  const getVitalSigns = async ({ cedulaPaciente }, { signal }) => {
    try {
      setIsLoading(true)
      const { data } = await getVitalSignsByCedula(
        { cedulaPaciente },
        { signal }
      )
      setVitalSigns(data)
    } catch (error) {
      console.error('Error fetching vital signs:', error)
      // toast.error('Error al obtener X'); // Mensaje para el usuario
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()

    getVitalSigns({ cedulaPaciente }, { signal: abortController.signal })

    return () => abortController.abort()
  }, [cedulaPaciente])

  return {
    vitalSigns,
    vitalSign,
    handleChange,
    handleSubmit,
    isLoading,
  }
}
