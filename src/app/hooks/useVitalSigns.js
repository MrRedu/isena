import { useEffect, useState } from 'react'
import { getVitalSignsByCedula } from '@/services/vitalSigns'
import { vitalSignInitialState } from '@/utils/consts'
import { toast } from 'sonner'

// const vitalSigns = {
//   altura: '1.23',
//   frecuenciaCardiaca: '123',
//   frecuenciaRespiratoria: '123',
//   peso: '123.12',
//   presionArterial: '222/222',
//   temperatura: '12.31',
// }

export function useVitalSigns({ cedulaPaciente }) {
  const [vitalSigns, setVitalSigns] = useState([])
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

    if (vitalSign.presionArterial.length < 6)
      return toast.error(
        'La presión arterial no puede tener menos de 5 caracteres'
      )

      /** todo: 
       * Q SE AGREGUE DINÁMICO, SIN REINICAR PÁGINA
       *  Q SE PUEDA HACER UN ADD CADA 12H
       *  TOASTER Q DIGA Q SE AGREGÓ
       * 
       * GENERAL: Q SE CIERREN LOS MODALES CUANDO SEA SUCCESS
       * 
       *  */

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
    } catch (error) {
      console.error('Error:', error)
      throw new Error('Error creating vital sign')
    } finally {
      // setVitalSign(vitalSignInitialState) ??
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
