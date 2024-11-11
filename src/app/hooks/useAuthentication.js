import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { initialValueFormLogin, initialValueFormRegister } from '@/utils/consts'
import { validateEmail } from '@/utils/utils'
import { toast } from 'sonner'
import { hashPassword } from '../services/authServices'
import { useRouter } from 'next/navigation'

export function useLogin() {
  const [formData, setFormData] = useState(initialValueFormLogin)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // Validaciones antes de enviar el formulario
    const isValidEmail = validateEmail(formData.email)
    if (!formData.email || !formData.password)
      return toast.error('Todos los campos son obligatorios')
    if (!isValidEmail) return toast.error('El correo electrónico no es valido')

    try {
      setIsLoading(true)
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      })

      if (result.status === 401) return toast.error('Credenciales incorrectas')

      if (result.error) {
        console.error(result.error)
      } else {
        // Redirigir manualmente si no se hace automáticamente
        router.push('/')
      }
    } catch (error) {
      setError(error)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  const handleReset = () => setFormData(initialValueFormLogin)

  return {
    formData,
    handleChange,
    handleSubmit,
    handleReset,
    isLoading,
    error,
  }
}

async function loadEmail(email) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${email}`
  )
  if (response.status === 200) {
    return true
  } else if (response.status === 404) {
    return false
  } else {
    throw new Error(`Error: #${response.status}`)
  }
}

export function useRegister() {
  const [formData, setFormData] = useState(initialValueFormRegister)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // Validaciones antes de enviar el formulario
    if (
      !formData.name ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    )
      return toast.error('Todos los campos son obligatorios')

    const isEmailValid = validateEmail(formData.email)
    if (!isEmailValid) return toast.error('El correo electrónico no es válido')
    if (!formData.password) return toast.error('La contraseña es obligatoria')
    if (formData.password.length < 8)
      return toast.error('La contraseña debe tener al menos 8 caracteres')
    if (formData.password !== formData.confirmPassword)
      return toast.error('Las contraseñas no coinciden')
    if (!formData.acceptTerms)
      return toast.error('Se deben aceptar los términos y condiciones')
    const isEmailRegistered = await loadEmail(formData.email)
    if (isEmailRegistered)
      return toast.error('El correo electrónico ya se encuentra registrado')

    try {
      setIsLoading(true)
      const hashedPassword = await hashPassword(formData.password)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/`,
        {
          method: 'POST',
          body: JSON.stringify({
            name: formData.name,
            lastName: formData.lastName,
            email: formData.email,
            password: hashedPassword,
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Error creating user')
      }

      if (response.status === 201) {
        setFormData(initialValueFormRegister)
        signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: true,
          callbackUrl: '/',
        })
      }

      setError(null)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => setFormData(initialValueFormRegister)

  return {
    formData,
    handleChange,
    handleSubmit,
    handleReset,
    isLoading,
    error,
  }
}
