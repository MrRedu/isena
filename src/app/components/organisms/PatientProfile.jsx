import propTypes from 'prop-types'
import { Card } from "@/app/MTailwind";
export const PatientProfile = ({ nombres, apellidos, cedula, fechaNacimiento }) => {
  return (
    <Card className='rounded-none border shadow-none overflow-hidden p-4'>
      <h2 className='font-bold uppercase text-lg flex flex-col'>
        <span>{nombres}</span>
        <span>{apellidos}</span>
      </h2>
      <p className=''>{cedula} | {fechaNacimiento}</p>
    </Card>
  )
};

PatientProfile.propTypes = {
  nombres: propTypes.string,
  apellidos: propTypes.string,
  cedula: propTypes.string,
  fechaNacimiento: propTypes.string
}