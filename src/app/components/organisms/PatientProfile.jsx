'use client'
import propTypes from 'prop-types'
import { Card } from '@/app/MTailwind'
import { usePatient } from '@/hooks/usePatients'
import { format } from '@formkit/tempo'
import { formatNumber, formatNumberToPhone } from '@/utils/utils'
import { DefaultSkeleton } from '@/components/atoms/DefaultSkeleton'
export const PatientProfile = ({ cedulaPaciente }) => {
  const { patient, isLoading } = usePatient({ cedulaPaciente })

  return (
    <Card className="rounded-none border shadow-none overflow-hidden p-4">
      {isLoading || !patient ? (<DefaultSkeleton />) :
        (<>
          <h2 className="font-bold uppercase text-lg flex flex-col">
            <span>{patient?.name}</span>
            <span>{patient?.lastName}</span>
          </h2>
          <p className="">
            {patient?.dni && formatNumber(patient.dni)}
            {patient.dni && patient.birthDate && (' / ')} {/* Separator if both are present */}
            {patient?.birthDate && format(patient.birthDate, 'MMM D, YYYY', 'es')}
          </p>
          <p>
            {patient?.phone && formatNumberToPhone(patient?.phone)} {/* Phone number if available */}
            {patient.phone && patient.email && (' / ')}{/* Separator if both are present */}
            {patient?.email} {/* Email if available */}
          </p>
        </>)}
    </Card>
  )
}

PatientProfile.propTypes = {
  cedulaPaciente: propTypes.string,
}
