// import { ONE_HOUR_IN_MILLISECONDS } from '@/utils/consts'

export const getAllPatients = async () => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/patients`
  try {
    const result = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    })
    const patients = await result.json()
    return patients
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Error loading patients')
  }
}

export const getPatientByCedula = async ({ cedula }, { signal }) => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/patients/${cedula}`
  try {
    const result = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
      signal,
    })
    const patient = await result.json()
    return patient
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Error loading patient')
  }
}

export const numberOfPatients = async () => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/patients/count`
  try {
    const result = await fetch(
      URL
      //,{
      //    next: { revalidate: ONE_HOUR_IN_MILLISECONDS * 2 },
      // }
    )
    const { count } = await result.json()
    return count
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Error loading patients count')
  }
}
