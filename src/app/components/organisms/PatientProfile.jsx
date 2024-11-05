'use client'
import propTypes from 'prop-types'
import { Card } from "@/app/MTailwind";
import { usePatient } from '@/hooks/usePatients';
import { format } from '@formkit/tempo';
import { formatNumber } from '@/utils/utils';
import { DefaultSkeleton } from '@/components/atoms/DefaultSkeleton';
export const PatientProfile = ({ cedulaPaciente }) => {
  const { patient, isLoading } = usePatient({ cedulaPaciente })
  return (
    <Card className='rounded-none border shadow-none overflow-hidden p-4'>
      {isLoading && <DefaultSkeleton />}
      {!isLoading &&
        <>
          <h2 className='font-bold uppercase text-lg flex flex-col'>
            <span>{patient?.nombres || 'Nombres'}</span>
            <span>{patient?.apellidos || 'Apellidos'}</span>
          </h2>
          <p className=''>
            {formatNumber(patient?.cedula) || 'Cédula'} / {format(patient?.fechaNacimiento, "MMM D, YYYY", "es") || 'Fecha de nacimiento'}
          </p>
          <p>
            {patient?.telefono || 'Teléfono'} / {patient?.email || 'Correo eléctronico'}
          </p>
        </>
      }
    </Card>
  )
};

PatientProfile.propTypes = {
  cedulaPaciente: propTypes.string
}