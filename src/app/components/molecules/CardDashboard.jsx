import propTypes from 'prop-types'
import { Button, Card, CardBody, CardFooter, Typography } from '@/app/MTailwind'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
export const CardDashboard = ({ title, amount, subtitle, buttonText, icon, toLink }) => {
  return (
    <Card className="mt-6 w-full">
      <CardBody>
        <div className='flex justify-between items-center'>
          {icon}
          <Typography className='text-4xl font-bold text-blush-950'>{amount}</Typography>
        </div>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography>
          {subtitle}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Link href={toLink} className="inline-block">
          <Button size="sm" variant="text" className="flex items-center gap-2 hover:bg-blush-500 hover:text-blush-50">
            {buttonText}
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

CardDashboard.propTypes = {
  title: propTypes.string,
  amount: propTypes.number,
  subtitle: propTypes.string,
  buttonText: propTypes.string,
  icon: propTypes.element,
  toLink: propTypes.string,
}