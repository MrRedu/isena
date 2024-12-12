import propTypes from 'prop-types'
import { Section } from '@/components/atoms/Section'
import { Typography } from '@/app/MTailwind'
import Image from 'next/image'

export const metadata = {
  title: 'Manual de usuario',
  description: 'Página del manual de usuario',
}

const sections = [
  {
    title: 'Ingresar al Sistema',
    paragraph:
      'En esta pantalla el usuario debe digitar su usuario (con formato de correo electrónico) y contraseña asignada, presionar sobre el botón Ingresar sesión tal como se muestra en la siguiente figura.',
    srcImg: '/manual/inicio-sesion.webp',
    altImg: 'Ingresar al Sistema',
  },
  {
    title: 'Registrarse al Sistema',
    paragraph:
      'Pantalla donde es posible registrarse como nuevo usuario del sistema; es de suma importancia tener en cuenta que está cuenta se creará con estado “Deshabilitada”; necesitarás de un usuario con rol de Administrador para activar la cuenta recién creada.',
    srcImg: '/manual/registrarse.webp',
    altImg: 'Registrarse al Sistema',
  },
  {
    title: 'Navegación',
    paragraph:
      'El menú de navegación ubicado de manera vertical en la parte izquierda de la interfaz gráfica consta de cinco (5) botones; siete (7) de ellos se dirigen a la página que corresponde a su nombre, una (1) de ellas es un submenú solo visto por los usuarios con rol de administrador y la restante (1) es un submenú. Se encuentra dividido de la siguiente manera:',
    srcImg: '/manual/navegacion.webp',
    altImg: 'Navegación',
  },
  {
    title: 'Página de Pacientes',
    paragraph:
      'Página conformada por una tabla de los pacientes registrados en el sistema, donde podemos registrar nuevos; ver detalles de cada paciente y/o imprimir su historia médica.',
    srcImg: '/manual/pacientes-tabla.webp',
    altImg: 'Página de Pacientes',
  },
  {
    title: 'Registrar Paciente',
    paragraph:
      'Formulario para registrar un nuevo paciente, este formulario cuenta con datos requeridos y datos no requeridos; además de validaciones por tipos de datos; por lo que la posibilidad de errores humanos se reduce en lo mínimo posible.',
    srcImg: '/manual/registrar-paciente.webp',
    altImg: 'Registrar Paciente',
  },
  {
    title: 'Página de Detalles del Paciente',
    paragraph:
      'Página conformada por dos columnas, donde podemos observar los datos del paciente, sus signos vitales con el pasar del tiempo, sus medicamentos activos, además de sus antecedentes, alergias y demás información necesaria en una historia médica. Toda esta información es editable, para ingresar nuevos valores con el pasar del tiempo.',
    srcImg: '/manual/historia-clinica.webp',
    altImg: 'Página de Detalles del Paciente',
  },
  {
    title: 'Página de Usuarios',
    paragraph:
      'Página conformada por una tabla de los usuarios registrados en el sistema, donde siendo administradores podemos editar su estado (habilitado/deshabilitado), o los 4 niveles de usuario correspondiente al sistema.',
    srcImg: '/manual/usuarios-tabla.webp',
    altImg: 'Página de Usuarios',
  },
  {
    title: 'Editar usuario',
    paragraph:
      'Formulario para editar el estado o rol de un usuario en específico. Permitiendo administrar el control y acceso de usuarios al sistema.',
    srcImg: '/manual/editar-usuario.webp',
    altImg: 'Editar usuario',
  },
  {
    title: 'Bitácora',
    paragraph:
      'Página de bitácora del sistema, accedida únicamente si eres un usuario administrador; su funcionalidad radica en poder observar los movimientos que los usuarios hacen en el sistema.',
    srcImg: '/manual/logs.webp',
    altImg: 'Bitácora',
  },
]

const ManualSection = ({ title, paragraph, srcImg, altImg }) => {
  return (
    <>
      <h3 className="font-bold text-sm uppercase text-blush-900">{title}</h3>
      <p>{paragraph}</p>
      <Image
        src={srcImg}
        alt={altImg}
        width={800}
        height={800}
        loading="lazy"
        className="w-full max-h-[630px] object-contain"
      />
    </>
  )
}

export default function HelpPage() {
  return (
    <Section className="flex flex-col mx-auto gap-4 max-w-[800px]">
      <Typography variant="h2" className="font-bold text-2xl text-center">
        {`Manual de usuario`}
      </Typography>
      <hr className="my-4" />
      <p>
        {`El presente manual está organizado de acuerdo a la secuencia de ingreso
        a las pantallas del sistema web de la siguiente manera:`}
      </p>
      <ul className="list-disc list-inside pl-4">
        <li>{`Ingreso al sistema de gestión de historias médicas`}</li>
        <li>{`Registro de usuario al sistema`}</li>
        <li>{`Navegación (menú de navegación)`}</li>
        <li>{`Operaciones básicas y frecuentes (Usuarios, pacientes, etc)`}</li>
        <li>{`Operaciones de sistema (Usuarios, bitácora, etc)`}</li>
      </ul>

      {sections.map((section, index) => (
        <ManualSection key={index} {...section} />
      ))}
    </Section>
  )
}

ManualSection.propTypes = {
  title: propTypes.string,
  paragraph: propTypes.string,
  srcImg: propTypes.string,
  altImg: propTypes.string,
}
