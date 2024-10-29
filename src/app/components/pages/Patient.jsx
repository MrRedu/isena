import propTypes from 'prop-types'
import { getPatient } from '@/services/patients'
import { Section } from '@/components/atoms/Section'
import { formatDate, formatNumber } from '@/utils/utils'
import { ActiveMedications, VitalSigns, MedicalHistory, PatientProfile, MedicalConsultation } from '@/components/organisms/'

const signosVitales = [
  { label: 'Altura', unitMeasurement: 'm', key: 'alturas' },
  { label: 'Peso', unitMeasurement: 'kg', key: 'pesos' },
  { label: 'Temperatura', unitMeasurement: '°C', key: 'temperaturas' },
  { label: 'Frec. Respiratoria', unitMeasurement: 'rpm', key: 'frecuencias_respiratorias' },
  { label: 'Presión Arterial', unitMeasurement: 'mmHg', key: 'presiones_arteriales' },
  { label: 'Frec. Cardiaca', unitMeasurement: 'bpm', key: 'frecuencias_cardiacas' },
];

export default async function Patient({ cedula }) {
  const { data: paciente = {} } = await getPatient({ cedula })
  return (
    <Section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left */}
      <div className='flex flex-col gap-4'>
        <PatientProfile nombres={paciente?.nombres_paciente} apellidos={paciente?.apellidos_paciente} cedula={formatNumber(paciente?.cedula_paciente)} fechaNacimiento={formatDate(paciente?.fecha_nacimiento_paciente)} />
        <VitalSigns vitalSigns={signosVitales} patient={paciente} />
      </div>


      {/* Center */}
      <div className='flex flex-col gap-4'>
        <ActiveMedications idPaciente={paciente?.id_paciente} medicamentos={paciente?.medicamentos} />
        <MedicalHistory />
      </div>

      {/* Right */}
      <div className='flex flex-col gap-4'>
        <MedicalConsultation />
      </div>
    </Section >
  )
};

Patient.propTypes = {
  cedula: propTypes.string
}