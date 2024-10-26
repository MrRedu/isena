'use client'
import propTypes from 'prop-types'
import { useState } from 'react';

import { DocumentIcon, EyeIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card, IconButton, Typography,
  CardHeader,
  Button,
  CardBody,
  CardFooter,
  Tooltip,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@/app/MTailwind";
import { formatNumber, whatIsMyAge } from "@/utils/utils";
import Link from 'next/link';
import { AddPatientForm } from '../../molecules/forms/AddPatientForm';
import { usePatient } from '#/src/app/hooks/usePatient';

// const registrosFake = [
//   {
//     id: 'y',
//     cedula: '654465465',
//     nombres: 'Robertino',
//     apellidos: 'El pirata',
//     telefono: '0441564654',
//     fechaNacimiento: '2021-05-05'
//   },
//   {
//     id: 'x',
//     cedula: '654465466',
//     nombres: 'Marina',
//     apellidos: 'La sirena',
//     telefono: '0441564655',
//     fechaNacimiento: '2021-06-06'
//   },
//   {
//     id: 'asd',
//     cedula: '654465467',
//     nombres: 'Fernando',
//     apellidos: 'El corsario',
//     telefono: '0441564656',
//     fechaNacimiento: '2021-07-07'
//   },
//   {
//     id: 'asd',
//     cedula: '654465468',
//     nombres: 'Isabella',
//     apellidos: 'La aventurera',
//     telefono: '0441564657',
//     fechaNacimiento: '2021-08-08'
//   },
//   {
//     id: 'asd',
//     cedula: '654465469',
//     nombres: 'Carlos',
//     apellidos: 'El explorador',
//     telefono: '0441564658',
//     fechaNacimiento: '2021-09-09'
//   },
//   {
//     id: '6',
//     cedula: '654465470',
//     nombres: 'Lucía',
//     apellidos: 'La navegante',
//     telefono: '0441564659',
//     fechaNacimiento: '2021-10-10'
//   },
//   {
//     id: '7',
//     cedula: '654465471',
//     nombres: 'Diego',
//     apellidos: 'El capitán',
//     telefono: '0441564660',
//     fechaNacimiento: '2021-11-11'
//   },
//   {
//     id: '8',
//     cedula: '654465472',
//     nombres: 'Sofía',
//     apellidos: 'La tesorera',
//     telefono: '0441564661',
//     fechaNacimiento: '2021-12-12'
//   },
//   {
//     id: '9',
//     cedula: '654465473',
//     nombres: 'Alejandro',
//     apellidos: 'El bucanero',
//     telefono: '0441564662',
//     fechaNacimiento: '2022-01-13'
//   },
//   {
//     id: '10',
//     cedula: '654465474',
//     nombres: 'Valentina',
//     apellidos: 'La guardiana',
//     telefono: '0441564663',
//     fechaNacimiento: '2022-02-14'
//   },
//   {
//     id: '11',
//     cedula: '654465475',
//     nombres: 'Javier',
//     apellidos: 'El aventurero',
//     telefono: '0441564664',
//     fechaNacimiento: '2022-03-15'
//   },
//   {
//     id: '12',
//     cedula: '654465476',
//     nombres: 'Clara',
//     apellidos: 'La exploradora',
//     telefono: '0441564665',
//     fechaNacimiento: '2022-04-16'
//   },
//   {
//     id: '13',
//     cedula: '654465477',
//     nombres: 'Luis',
//     apellidos: 'El navegante',
//     telefono: '0441564666',
//     fechaNacimiento: '2022-05-17'
//   },
//   {
//     id: '14',
//     cedula: '654465478',
//     nombres: 'Ana',
//     apellidos: 'La sirena',
//     telefono: '0441564667',
//     fechaNacimiento: '2022-06-18'
//   },
//   {
//     id: '15',
//     cedula: '654465479',
//     nombres: 'Ricardo',
//     apellidos: 'El capitán',
//     telefono: '0441564668',
//     fechaNacimiento: '2022-07-19'
//   },
//   {
//     id: '16',
//     cedula: '654465480',
//     nombres: 'Patricia',
//     apellidos: 'La tesorera',
//     telefono: '0441564669',
//     fechaNacimiento: '2022-08-20'
//   },
//   {
//     id: '17',
//     cedula: '654465481',
//     nombres: 'Eduardo',
//     apellidos: 'El bucanero',
//     telefono: '0441564670',
//     fechaNacimiento: '2022-09-21'
//   },
//   {
//     id: '18',
//     cedula: '654465482',
//     nombres: 'Gabriela',
//     apellidos: 'La aventurera',
//     telefono: '0441564671',
//     fechaNacimiento: '2022-10-22'
//   },
//   {
//     id: '19',
//     cedula: '654465483',
//     nombres: 'Manuel',
//     apellidos: 'El explorador',
//     telefono: '0441564672',
//     fechaNacimiento: '2022-11-23'
//   },
//   {
//     id: '20',
//     cedula: '654465484',
//     nombres: 'Natalia',
//     apellidos: 'La navegante',
//     telefono: '0441564673',
//     fechaNacimiento: '2022-12-24'
//   },
//   {
//     id: '21',
//     cedula: '654465485',
//     nombres: 'Oscar',
//     apellidos: 'El capitán',
//     telefono: '0441564674',
//     fechaNacimiento: '2023-01-25'
//   },
//   {
//     id: '22',
//     cedula: '654465486',
//     nombres: 'Laura',
//     apellidos: 'La tesorera',
//     telefono: '0441564675',
//     fechaNacimiento: '2023-02-26'
//   }
// ];

export const PatientsTable = ({ title, subtitle, tableHeader, tableRows = [] }) => {
  const [patients, setPatients] = useState([...tableRows])
  const { patient, handleChange, handleSubmit } = usePatient()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 10;
  const totalPages = Math.ceil(patients.length / patientsPerPage);

  // Get current patients for the current page
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              {title}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              {subtitle}
            </Typography>
          </div>
          <div className="flex flex-col lg:flex-row w-full shrink-0 gap-2 md:w-max">
            <Button variant="outlined" onClick={handleOpen}>
              {`Registrar paciente`}
            </Button>
            <Dialog open={open} handler={handleOpen}   >
              <DialogHeader>{`Registrar paciente`}</DialogHeader>
              <DialogBody className="max-h-[75vh] w-full overflow-y-auto">
                <AddPatientForm patient={patient} handleChange={handleChange}
                />
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleOpen}
                  className="mr-1"
                >
                  <span>Cancelar</span>
                </Button>
                <Button variant="gradient" color="green"
                  onClick={handleSubmit}
                >
                  <span>Agregar</span>
                </Button>
              </DialogFooter>
            </Dialog>
            <div className="w-full md:w-72">
              <Input
                label="V-9.696.363"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </div>
      </CardHeader>


      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {tableHeader.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentPatients.map(
              (
                {
                  cedula,
                  nombres,
                  apellidos,
                  telefono,
                  fechaNacimiento,
                  ultimaConsulta,
                },
                index,
              ) => {
                const isLast = index === tableRows.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={cedula}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                        >
                          {formatNumber(cedula)}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {apellidos}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {nombres}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {whatIsMyAge(fechaNacimiento)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {telefono}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal capitalize"
                          >
                            {ultimaConsulta}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Ver detalles">
                        <Link href={`/patients/${cedula}`}>
                          <IconButton variant="text">
                            <EyeIcon className="h-4 w-4" />
                          </IconButton>
                        </Link>
                      </Tooltip>

                      <Tooltip content="Imprimir historia">
                        <IconButton variant="text" size="sm">
                          <DocumentIcon className="h-4 w-4 text-gray-900" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm" onClick={handlePrevPage} disabled={currentPage === 1}>
          Anterior
        </Button>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <IconButton
              key={i + 1}
              variant={currentPage === i + 1 ? "outlined" : "text"}
              size="sm"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </IconButton>
          ))}
        </div>
        <Button variant="outlined" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
          Siguiente
        </Button>
      </CardFooter>
    </Card>
  )
};

PatientsTable.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  tableHeader: propTypes.array,
  tableRows: propTypes.array
}