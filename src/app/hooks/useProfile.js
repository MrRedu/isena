import { useEffect, useState } from 'react'
import { getUserByEmail } from '@/services/users'
import { toast } from 'sonner'

const userInitialState = {
  id: '',
  name: '',
  lastName: '',
  email: '',
  rol: '',
  status: '',
  password: '',
}

export function useProfile({ emailUser }) {
  const [user, setUser] = useState(userInitialState)
  const [isChanged, setIsChanged] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setUser(prev => {
      const updatedUser = { ...prev, [name]: value }
      setIsChanged(
        JSON.stringify(updatedUser) !== JSON.stringify(userInitialState)
      ) // Compara con el estado inicial
      return updatedUser
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (user.name.length < 3 || user.lastName.length < 3)
      toast.error('Nombres y apellidos deben tener al menos 3 caracteres')

    try {
      setIsLoading(true)
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${emailUser}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }
      )

      if (!result.ok) {
        throw new Error('Error al actualizar el perfil')
      }

      toast.success('Perfil actualizado correctamente')
    } catch (error) {
      console.error('Error:', error)
      throw new Error('Error al actualizar el perfil')
    } finally {
      setIsLoading(false)
    }
  }

  const getUser = async ({ emailUser }, { signal }) => {
    try {
      setIsLoading(true)
      const { data } = await getUserByEmail({ emailUser }, { signal })

      const dataMapped = {
        id: data.id_usuario,
        name: data.nombres_usuario,
        lastName: data.apellidos_usuario,
        email: data.correo_usuario,
        rol: data.rol_usuario,
        status: data.status_usuario,
        password: data.contrasena_usuario,
      }
      setUser(dataMapped)
      setIsChanged(false)
    } catch (error) {
      console.error('Error fetching user:', error)
      // toast.error('Error al obtener X'); // Mensaje para el usuario
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    getUser({ emailUser }, { signal: abortController.signal })

    return () => abortController.abort()
  }, [emailUser])

  return {
    user,
    isChanged,
    handleChange,
    handleSubmit,
    isLoading,
  }
}
