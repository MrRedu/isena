import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { initialValueFormLogin, initialValueFormRegister } from '@/utils/consts'
import { validateEmail } from '@/utils/utils'
import { toast } from 'sonner'

export function useLogin() {
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

export function useRegister() {
  const [formData, setFormData] = useState(
    initialValueFormRegister
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
    if(
      !formData.email || 
      !formData.password || 
      !formData.confirmPassword       
    ) return toast.error('Todos los campos son obligatorios')

    const isEmailValid = validateEmail(formData.email)
    if(!isEmailValid) return toast.error('El correo electrónico no es válido')
    if(formData.password !== formData.confirmPassword) return toast.error('Las contraseñas no coinciden')
    if(!formData.acceptTerms)return toast.error('Se deben aceptar los términos y condiciones')
      // Mejorar la validación del correo que ya existe
    const isEmailRegistered = await fetch(`http://localhost:3000/api/users/${formData.email}`)
    if(isEmailRegistered.ok) return toast.error('El correo electrónico ya se encuentra registrado')

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