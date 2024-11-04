'use client'
import propTypes from 'prop-types'
import { Card } from "@/app/MTailwind";
import { usePatient } from '@/hooks/usePatients';
import { format } from '@formkit/tempo';
import { formatNumber } from '@/utils/utils';
export const PatientProfile = ({ cedulaPaciente }) => {
  const { patient, isLoading } = usePatient({ cedulaPaciente })
  return (
    <Card className='rounded-none border shadow-none overflow-hidden p-4'>
      <h2 className='font-bold uppercase text-lg flex flex-col'>
        <span>{patient?.nombres || 'Nombres'}</span>
        <span>{patient?.apellidos || 'Apellidos'}</span>
      </h2>
      <p className=''>{formatNumber(patient?.cedula) || 'Cédula'} / {format(patient?.fechaNacimiento, "MMM D, YYYY", "es") || 'Fecha de nacimiento'}</p>
    </Card>
  )
};

PatientProfile.propTypes = {
  cedulaPaciente: propTypes.string
}