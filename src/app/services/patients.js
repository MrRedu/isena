export const getAllPatients = async () => {
  const result = await fetch(`http://localhost:3000/api/patients`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache'
  })
  const patients = await result.json()
  return patients
}

export const getPatient = async ({ cedula }) => {
  const result = await fetch(`http://localhost:3000/api/patients/${cedula}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache'
  })
  const patient = await result.json()
  return patient
}