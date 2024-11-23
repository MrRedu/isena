import { useState } from 'react'
import { getIdByRol, getIdByStatus } from '@/utils/utils'
import { toast } from 'sonner'

export function useUsers({ initialStateUsers, handleCloseModal }) {
  const [users, setUsers] = useState(initialStateUsers)
  const [currentUser, setCurrentUser] = useState(null)

  const handleChangeStatusCurrentUser = () =>
    setCurrentUser(prev => ({
      ...prev,
      status: prev.status === 'Habilitado' ? 'Deshabilitado' : 'Habilitado',
    }))

  const handleChangeRolCurrentUser = value =>
    setCurrentUser(prev => ({ ...prev, rol: value }))

  const handleUpdateUser = async e => {
    e.preventDefault()
    try {
      // setIsLoading(true)
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${currentUser.correo}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idRol: getIdByRol(currentUser.rol),
            idStatus: getIdByStatus(currentUser.status),
          }),
        }
      )

      if (!result.ok) {
        throw new Error('Error al actualizar al usuario')
      }

      // Aquí actualizamos el estado de users utilizando currentUser
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.correo === currentUser.correo ? currentUser : user
        )
      )

      toast.success('Usuario actualizado satisfactoriamente')
      handleCloseModal()
    } catch (error) {
      console.error('Error:', error)
      throw new Error('Error al actualizar al usuario')
    } finally {
      // setIsLoading(false)
    }
  }

  return {
    users,
    currentUser,
    setCurrentUser,
    handleChangeStatusCurrentUser,
    handleChangeRolCurrentUser,
    handleUpdateUser,
  }
}
