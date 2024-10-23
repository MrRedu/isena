import propTypes from 'prop-types'
import Patient from "@/components/pages/Patient";

export default function PatientPage({ params: { cedula } }) {
  return (
    <Patient cedula={cedula} />
  )
};

PatientPage.propTypes = {
  params: propTypes.object,
  cedula: propTypes.string
}