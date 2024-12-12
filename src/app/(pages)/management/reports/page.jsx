'use client'
import { Section } from '@/components/atoms/Section'
import { CardReport } from '@/components/molecules/CardReport'
import {
  CalendarDaysIcon,
  UserGroupIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline'

const handleDownloadExcel = ({ endpoint, fileName }) => {
  const url = `/api/xlsx/${endpoint}`

  // Crea un enlace y simula un clic para descargar el archivo
  const a = document.createElement('a')
  a.href = url
  a.download = `${fileName}.xlsx` // Nombre sugerido para el archivo
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

const classNameIcon = 'text-blush-600 w-9 h-9'
const administrativeReports = [
  {
    id: 'users',
    title: 'Usuarios',
    subtitle: 'Usuarios registrados',
    icon: <UserGroupIcon size={36} className={`${classNameIcon}`} />,
    onClick: () =>
      handleDownloadExcel({
        endpoint: 'users',
        fileName: 'usuarios',
      }),
  },
  {
    id: 'log',
    title: 'Bitácora',
    subtitle: 'Movimiento de usuarios',
    icon: <CalendarDaysIcon size={36} className={`${classNameIcon}`} />,
    onClick: () =>
      handleDownloadExcel({
        endpoint: 'logs',
        fileName: 'bitacora',
      }),
  },
]

const technicalReports = [
  {
    id: 'patients',
    title: 'Pacientes',
    subtitle: 'Información básica de pacientes',
    icon: <UserPlusIcon size={36} className={`${classNameIcon}`} />,
    onClick: () =>
      handleDownloadExcel({
        endpoint: 'patients',
        fileName: 'pacientes',
      }),
  },
]

export default function ReportsPage() {
  return (
    <Section>
      <h2 className="font-bold mb-8">{`Página de reportes`}</h2>

      <div className="flex flex-col gap-4 mb-6">
        <h3 className="font-bold text-sm uppercase text-blush-900">
          Reportes técnicos
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {technicalReports.map(({ id, title, subtitle, icon, onClick }) => {
            return (
              <CardReport
                key={id}
                title={title}
                subtitle={subtitle}
                icon={icon}
                onClick={onClick}
              />
            )
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <h3 className="font-bold text-sm uppercase text-blush-900">
          Reportes administrativos
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {administrativeReports.map(
            ({ id, title, subtitle, icon, onClick }) => {
              return (
                <CardReport
                  key={id}
                  title={title}
                  subtitle={subtitle}
                  icon={icon}
                  onClick={onClick}
                />
              )
            }
          )}
        </div>
      </div>
    </Section>
  )
}
