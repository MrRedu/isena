import { useEffect, useState } from "react"
import { getVitalSignsByCedula } from "../services/vitalSigns"

export function useVitalSigns({ cedulaPaciente }) {
const [vitalSigns, setVitalSigns] = useState([])
const [isLoading, setIsLoading] = useState(false)

const getVitalSigns = async ({ cedulaPaciente }, { signal }) => {
  try {
    setIsLoading(true)
    const vitalSignsByCedula = await getVitalSignsByCedula(
      { cedulaPaciente },
      { signal }
    )
    setVitalSigns(vitalSignsByCedula)
  } catch (error) {
    console.error("Error fetching vital signs:", error);
    // toast.error('Error al obtener signos vitales'); // Mensaje para el usuario
  } finally {
    setIsLoading(false)
  }
}

useEffect(() => {
  const abortController = new AbortController()

  getVitalSigns({cedulaPaciente}, {signal: abortController.signal})

  return () =>   abortController.abort()
  }, [])

  return {  
    vitalSigns,
    isLoading
  }
}


