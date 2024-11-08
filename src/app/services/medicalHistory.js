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
