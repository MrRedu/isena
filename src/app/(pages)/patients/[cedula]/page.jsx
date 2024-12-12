'use client'
import propTypes from 'prop-types'
import { Section } from '@/components/atoms/Section'
import {
  ActiveMedications,
  VitalSigns,
  MedicalHistory,
  PatientProfile,
} from '@/components/organisms/'
import { usePDF } from 'react-to-pdf'

// export const metadata = {
//   title: 'Paciente',
//   description: 'Página de paciente',
// }

export default function PatientPage({ params: { cedula } }) {
  const { toPDF, targetRef } = usePDF({
    filename: `paciente-${cedula}.pdf`,
    resolution: 5,
    page: {
      orientation: 'landscape',
    },
  })
  return (
    <Section
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full"
      targetRef={targetRef}
    >
      <div className="flex flex-col gap-4">
        <PatientProfile cedulaPaciente={cedula} toPDF={toPDF} />
        <VitalSigns cedulaPaciente={cedula} />
      </div>
      <div className="flex flex-col gap-4">
        <ActiveMedications cedulaPaciente={cedula} />
        <MedicalHistory cedulaPaciente={cedula} />
      </div>
    </Section>
  )
}

PatientPage.propTypes = {
  params: propTypes.object,
  cedula: propTypes.string,
}
