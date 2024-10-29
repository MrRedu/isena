import { Button, Typography } from "@/app/MTailwind";

const consultas = [
  {
    id: 1,
    title: 'Dolor de cabeza',
    datetime: '2022-01-01 18:00',
  },
  {
    id: 2,
    title: 'Dolor de cabeza',
    datetime: '2022-01-01 22:00',
  },
  {
    id: 3,
    title: 'Dolor de cabeza',
    datetime: '2022-01-01 08:00',
  },
  {
    id: 4,
    title: 'Dolor de cabeza',
    datetime: '2025-01-01 10:00',
  }
]

export const MedicalConsultation = () => {
  return (
    <>
      <Button size='lg' variant="outlined">{`Iniciar nueva consulta`}</Button>
      <div>

        <Typography variant="h3" className='font-bold uppercase text-sm'>{`Citas agendadas`}</Typography>

        {
          consultas.map(({ id, title, datetime }) => (
            <div key={id} className="flex border">
              <div className={`
                flex flex-col items-center justify-center p-2 min-w-[84px]
                border border-l-4 ${new Date(datetime) < new Date() ? 'border-l-blue-500' : 'border-l-green-500'}
                `}>
                <span className="text-sm font-bold">{new Date(datetime).getDay().toString().padStart(1, '0')}</span>
                <span className="text-sm uppercase spacing">{'Ene'}</span>
              </div>
              <div className="w-full flex items-center justify-between gap-2 py-2 px-4">
                <div className="flex flex-col gap-2">
                  <h4>{title}</h4>
                  {/* <p className="text-sm text-gray-600">{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam voluptatum`}</p> */}
                </div>
                <div>
                  <span className="text-sm text-gray-600 text-nowrap">{new Date(datetime).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                </div>
              </div>
            </div>
          ))
        }



      </div>
    </>
  )
};
