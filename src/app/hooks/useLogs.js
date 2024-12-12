import { useMemo, useState } from 'react'
export function useLogs({ initialStateLogs }) {
  const [
    logs,
    // setLogs
  ] = useState(initialStateLogs)
  const [filter, setFilter] = useState('')
  const handleFilterChange = e => {
    setFilter(e.target.value)
  }

  const filteredLogs = useMemo(() => {
    return logs.filter(log =>
      log.correo?.toString().toLowerCase().includes(filter.toLowerCase())
    )
  }, [logs, filter])

  return { logs: filteredLogs, filter, handleFilterChange }
}
