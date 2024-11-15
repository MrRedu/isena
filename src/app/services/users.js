export const getAllUsers = async () => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/users`
  try {
    const result = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    })
    const users = await result.json()
    return users
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Error loading users')
  }
}

export const getUserByEmail = async ({ emailUser }, { signal }) => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/users/${emailUser}`
  try {
    const result = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
      signal,
    })
    const user = await result.json()
    return user
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Error loading user')
  }
}
