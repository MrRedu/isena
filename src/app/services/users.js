export const getAllUsers = async () => {
  const URL = `http://localhost:3000/api/users`
  try {
    const result = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-cache'
    })
    const users = await result.json()
    return users
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Error loading users')
  }  
}