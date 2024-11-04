import { useEffect, useState } from "react"
import { getVitalSignsByCedula } from "@/services/vitalSigns"
import { vitalSignInitialState } from "@/utils/consts"

export function useVitalSigns({ cedulaPaciente }) {
const [vitalSigns, setVitalSigns] = useState([])
const [vitalSign, setVitalSign] = useState(vitalSignInitialState)
const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setVitalSign(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(vitalSign)
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
    vitalSign,
    handleChange,
    handleSubmit,
    isLoading
  }
}


