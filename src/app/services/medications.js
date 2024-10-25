import { toast } from "sonner"

export const deleteMedication = async id => {
  const result = await fetch(`http://localhost:3000/api/medications/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!result.ok) {
    return toast.error('Error al eliminar el medicamento')
  }
  if (result.ok) {
    return toast.success(`El medicamento ha sido eliminado`)
  }
}