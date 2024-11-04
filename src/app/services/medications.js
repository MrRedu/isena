import { toast } from "sonner"

export const getMedicationsByCedula = async ({cedulaPaciente} , {signal}) => {
  const URL = `http://localhost:3000/api/patients/${cedulaPaciente}/medications`
  try {
    const result = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
      signal
    })
    const medications = await result.json()
    return medications
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Error loading medications')
  }
}

export const deleteMedication = async id => {
  const URL = `http://localhost:3000/api/medications/${id}`
  try {
    const result = await fetch(URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!result.ok) {
      throw new Error('Error deleting medication')
    }
    toast.success('Medicamento eliminado correctamente')
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Error deleting medication')
  }


}