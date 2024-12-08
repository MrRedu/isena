import propTypes from 'prop-types'
import { Typography } from '@/app/MTailwind'
import { Fragment } from 'react'
export function DefaultSkeleton({ className = '', times = 2 }) {
  return (
    <div className={`max-w-full animate-pulse w-full ${className}`}>
      <>
        {Array.from({ length: times }, (_, index) => (
          <Fragment key={index}>
            <Typography
              key={index}
              as="div"
              variant="h2"
              className={`mb-2 h-3 rounded-full bg-gray-300 ${index % 2 === 0 ? 'w-[85%]' : 'w-1/2'}`}
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="paragraph"
              className="mb-2 h-2 w-full rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
          </Fragment>
        ))}
      </>
    </div>
  )
}

DefaultSkeleton.propTypes = {
  className: propTypes.string,
  times: propTypes.number,
}
