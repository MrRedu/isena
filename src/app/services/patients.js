export const getPatient = async ({ cedula }) => {
  const result = await fetch(`http://localhost:3000/api/patients/${cedula}`)
  const patient = await result.json()
  return patient
}