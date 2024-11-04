'use client'
import propTypes from 'prop-types'
import { Card } from "@/app/MTailwind";
import { usePatient } from '@/hooks/usePatients';
export const PatientProfile = ({ cedulaPaciente }) => {
  const { patient, isLoading } = usePatient({ cedulaPaciente })
  console.log(patient, isLoading)
  return (
    <Card className='rounded-none border shadow-none overflow-hidden p-4'>
      <h2 className='font-bold uppercase text-lg flex flex-col'>
        <span>{patient?.nombres_paciente}</span>
        <span>{patient?.apellidos_paciente}</span>
      </h2>
      <p className=''>{patient?.cedula_paciente} | {patient?.fecha_nacimiento_paciente}</p>
    </Card>
  )
};

PatientProfile.propTypes = {
  cedulaPaciente: propTypes.string
}