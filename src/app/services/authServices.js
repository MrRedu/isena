import * as bcrypt from 'bcryptjs'

export const validatePassword = async (password, dbPassword) => {
  return await bcrypt.compare(password, dbPassword)
}

export const hashPassword = async plainPassword => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(plainPassword, salt)
    return hashedPassword
  } catch (error) {
    console.error('Error while hashing password', error)
    throw new Error('Something went wrong')
  }
}