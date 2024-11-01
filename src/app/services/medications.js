import { toast } from "sonner"

export const getMedicationsByCedula = async ({cedulaPaciente} , {signal}) => {
  const URL = `http://localhost:3000/api/patients/${cedulaPaciente}/medications`
  try {
    const result = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal
    })
    const {data} = await result.json()
    return data
  } catch (error) {
    throw new Error('Error loading medications')
  }
}

export const deleteMedication = async id => {
  const result = await fetch(`http://localhost:3000/api/medications/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!result.ok) return toast.error('Error al eliminar el medicamento')
  if (result.ok) return toast.success(`El medicamento ha sido eliminado`)
}