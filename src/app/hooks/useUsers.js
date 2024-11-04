import { useState } from "react"

export function useUsers({initialStateUsers}) {
  const [users, setUsers] = useState( initialStateUsers )
  
  return {
    users
  }
}