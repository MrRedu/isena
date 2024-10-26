import {  useState } from 'react'
import { signIn } from 'next-auth/react'
import { initialValueFormLogin } from '@/utils/consts'
import { validateEmail } from '@/utils/utils'
import { toast } from 'sonner'

export default function useLogin() {
  const [formData, setFormData] = useState(
    initialValueFormLogin
  )
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
    const isValidEmail = validateEmail(formData.email)
    if (!formData.email || !formData.password) return toast.error('Todos los campos son obligatorios')
    if (!isValidEmail) return toast.error('El correo electrónico no es valido')

    try {
      setIsLoading(true)
      const response = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        callbackUrl: `/`,
        redirect: false,
      })

      if (response.status === 401) return toast.error('Credenciales incorrectas')
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