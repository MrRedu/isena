export const getVitalSignsByCedula = async ({cedulaPaciente} , {signal}) => {
  const URL = `http://localhost:3000/api/vital-signs/${cedulaPaciente}`
  try {
    const result = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal
    })
    const vitalSigns = await result.json()
    return vitalSigns
  } catch (error) {
    throw new Error('Error loading vital signs')
  }
}
