export const getAllLogs = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    })
    const result = await res.json()
    return result
  } catch (error) {
    console.log(error)
  }
}
