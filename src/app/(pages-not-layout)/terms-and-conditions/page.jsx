import { Section } from '@/components/atoms/Section'
import Link from 'next/link'

export const metadata = {
  title: 'Términos y Condiciones',
}

export default function TermsAndConditionsPage() {
  return (
    <Section className="flex flex-col items-center justify-center mx-auto gap-4 max-w-[600px]">
      <h1 className="font-bold text-2xl uppercase">
        {'Términos y Condiciones'}
      </h1>
      <ol className="list-decimal flex flex-col gap-6">
        <li>
          <h2 className="font-bold inline text-lg">Definiciones</h2>
          <ul className="list-disc list-inside">
            <li>
              <strong>{`Historia Clínica Electrónica (HCE): `}</strong>
              <span>{`Registro digital que contiene toda la información relevante sobre la salud del paciente, incluyendo diagnósticos, tratamientos y evolución clínica.`}</span>
            </li>
            <li>
              <strong>{`Usuario: `}</strong>
              <span>{`Cualquier persona autorizada para acceder al sistema, incluyendo médicos, enfermeros y personal administrativo.`}</span>
            </li>
            <li>
              <strong>{`Administrador: `}</strong>
              <span>{`Persona responsable de gestionar el acceso y las funciones del sistema.`}</span>
            </li>
          </ul>
        </li>
        <li>
          <h2 className="font-bold inline text-lg">Propósito del Sistema</h2>
          <ul className="list-disc list-inside">
            <li>{`El sistema tiene como objetivo facilitar la gestión integral de las historias clínicas electrónicas, asegurando la confidencialidad, integridad y disponibilidad de la información médica.`}</li>
          </ul>
        </li>
        <li>
          <h2 className="font-bold inline text-lg">{`Requisitos del Sistema`}</h2>
          <ul className="list-disc list-inside">
            <li>
              <strong>{`Confidencialidad: `}</strong>
              <span>{`La información debe ser accesible solo a personal autorizado. Se implementarán medidas para prevenir accesos no autorizados y garantizar la seguridad de la información medica.`}</span>
            </li>
            <li>
              <strong>{`Integridad: `}</strong>
              <span>{`Los datos deben permanecer inalterados y completos. Cualquier modificación debe ser registrada con fecha, hora y usuario responsable.`}</span>
            </li>
            <li>
              <strong>{`Disponibilidad: `}</strong>
              <span>{`La HCE debe estar accesible en todo momento para el personal autorizado, garantizando su uso en situaciones críticas`}</span>
            </li>
          </ul>
        </li>
        <li>
          <h2 className="font-bold inline text-lg">{`Derechos del Paciente: `}</h2>
          <ul className="list-disc list-inside">
            <li>
              {`Los pacientes tienen derecho a acceder a su historia clínica y recibir copias cuando lo soliciten.`}
            </li>
            <li>
              {`Se debe garantizar la protección de la identidad del paciente y la confidencialidad de su información médica.`}
            </li>
          </ul>
        </li>
        <li>
          <h2 className="font-bold inline text-lg">{`Obligaciones del Usuario: `}</h2>
          <ul className="list-disc list-inside">
            <li>{`Los usuarios deben registrar toda la información clínica de manera veraz, completa y en tiempo real.`}</li>
            <li>{`Está prohibido compartir contraseñas o credenciales de acceso al sistema.`}</li>
            <li>{`Cualquier violación a estos términos puede resultar en sanciones administrativas o legales.`}</li>
          </ul>
        </li>
        <li>
          <h2 className="font-bold inline text-lg">{`Seguridad del Sistema: `}</h2>
          <ul className="list-disc list-inside">
            <li>{`Se implementarán medidas técnicas para proteger los datos contra pérdidas, daños o accesos no autorizados.`}</li>
            <li>{`El sistema deberá contar con respaldos periódicos y protocolos de recuperación ante desastres.`}</li>
          </ul>
        </li>
        <li>
          <h2 className="font-bold inline text-lg">{`Modificaciones a los Términos: `}</h2>
          <ul className="list-disc list-inside">
            <li>{`ISENA se reserva el derecho de modificar estos términos y condiciones conforme a cambios legislativos o mejoras en el sistema. Los usuarios serán notificados sobre cualquier cambio significativo.`}</li>
          </ul>
        </li>
        <li>
          <h2 className="font-bold inline text-lg">{`Legislación Aplicable: `}</h2>
          <ul className="list-disc list-inside">
            <li>{`Estos términos se regirán por las leyes vigentes en materia de salud y protección de datos personales aplicables en el país.`}</li>
          </ul>
        </li>
        <li>
          <h2 className="font-bold inline text-lg">{`Aceptación: `}</h2>
          <ul className="list-disc list-inside">
            <li>{`El uso del sistema implica la aceptación plena de estos términos y condiciones por parte del usuario.`}</li>
          </ul>
        </li>
      </ol>

      <Link
        href="/"
        className="my-8 hover:underline hover:text-blush-600"
      >{`Volver a la página principal`}</Link>
    </Section>
  )
}
