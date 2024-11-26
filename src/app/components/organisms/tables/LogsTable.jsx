'use client'
import propTypes from 'prop-types'
import {
  Card,
  IconButton,
  Typography,
  CardHeader,
  Button,
  CardBody,
  CardFooter,
  Input,
} from '@/app/MTailwind'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useLogs } from '@/hooks/useLogs'

export const LogsTable = ({
  title,
  subtitle,
  tableHeader,
  tableRows = [],
}) => {
  const { logs } = useLogs({
    initialStateLogs: tableRows,
    // handleCloseModal: handleClose
  })

  const [currentPage, setCurrentPage] = useState(1)
  const logsPerPage = 10
  const totalPages = Math.ceil(logs.length / logsPerPage)

  // Get current logs for the current page
  const indexOfLastUser = currentPage * logsPerPage
  const indexOfFirstUser = indexOfLastUser - logsPerPage
  const currentPatients = logs.slice(indexOfFirstUser, indexOfLastUser)

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }


  return (
    <>
      <Card className="h-full w-full shadow-none">
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
                  label="Usuario"
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
                {tableHeader.map(head => (
                  <th
                    key={head}
                    className="border-y border-blush-300 bg-blush-50/50 p-4"
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
                ({ id, usuario, fecha, acciones }, index) => {
                  const isLast = index === tableRows.length - 1
                  const classes = isLast ? 'p-4' : 'p-4 border-b border-blush-50'

                  return (
                    <tr key={`${id}`} className='even:bg-blush-300/10'>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography variant="small" color="blue-gray">
                            {usuario}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {fecha}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {acciones}
                        </Typography>
                      </td>
                    </tr>
                  )
                }
              )}
            </tbody>
          </table>
        </CardBody>

        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button
            variant="outlined"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <IconButton
                key={i + 1}
                variant={currentPage === i + 1 ? 'outlined' : 'text'}
                size="sm"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </IconButton>
            ))}
          </div>
          <Button
            variant="outlined"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </Button>
        </CardFooter>
      </Card>
    </>
  )
};

LogsTable.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  tableHeader: propTypes.array,
  tableRows: propTypes.array,
}
