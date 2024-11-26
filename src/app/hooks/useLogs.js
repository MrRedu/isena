import { useState } from 'react'
export function useLogs({ initialStateLogs }) {
  const [
    logs,
    // setLogs
  ] = useState(initialStateLogs)

  return { logs }
}
