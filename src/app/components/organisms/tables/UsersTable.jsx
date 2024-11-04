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
} from "@/app/MTailwind";
import { formatNumber, whatIsMyAge } from "@/utils/utils";
import Link from 'next/link';

export const PatientsTable = ({ title, subtitle, tableHeader, tableRows = [] }) => {
  const { users } = useUsers({ initialStatePatients: tableRows })


  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Get current patients for the current page
  const indexOfLastPatient = currentPage * usersPerPage;
  const indexOfFirstPatient = indexOfLastPatient - usersPerPage;
  const currentPatients = users.slice(indexOfFirstPatient, indexOfLastPatient);

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
                  <tr key={`${cedula}${index}`}>
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