import propTypes from 'prop-types'
import { Card as MTCard, Typography } from "@/app/MTailwind";
const CardHeader = ({ children, icon }) => {
  return (
    <div className='flex justify-between items-center bg-blush-50 px-4 py-2 h-[52px] '>
      <Typography variant="h3" className='font-bold uppercase text-sm'>{children}</Typography>
      {icon &&
        icon
      }
    </div>
  )
}

export const Card = ({ children, className }) => {
  return (
    <MTCard className={`rounded-none border shadow-none overflow-hidden ${className}`}>
      {children}
    </MTCard>
  )
};

Card.CardHeader = CardHeader

Card.propTypes = {
  children: propTypes.node,
  className: propTypes.string
}
CardHeader.propTypes = {
  children: propTypes.node,
  icon: propTypes.node,
}