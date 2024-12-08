import { toast } from 'sonner'

export const getMedicalHistoryByCedula = async (
  { cedulaPaciente },
  { signal }
) => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/patients/${cedulaPaciente}/medical-history`
  try {
    const result = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
      signal,
    })
    const medicalHistory = await result.json()
    return medicalHistory
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Error loading medications')
  }
}

export const deleteMedicalHistory = async id => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/medical-history/${id}`
  try {
    const result = await fetch(URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!result.ok) {
      throw new Error('Error deleting medical history')
    }
    toast.success('Antecedente eliminado correctamente')
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Error deleting medical history')
  }
}
