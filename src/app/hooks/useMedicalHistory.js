import { useEffect, useState } from 'react'
import { getMedicalHistoryByCedula } from '@/services/medicalHistory'

export function useMedicalHistory({ cedulaPaciente }) {
  const [medicalHistory, setMedicalHistory] = useState([])
  const [isLoading, setIsLoading] = useState()

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

  useEffect(() => {
    const abortController = new AbortController()
    getMedicalHistory({ cedulaPaciente }, { signal: abortController.signal })

    return () => abortController.abort()
  }, [cedulaPaciente])

  return {
    medicalHistory,
    isLoading,
  }
}
