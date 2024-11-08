import propTypes from 'prop-types'
export const TemperatureIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Capa_1"
      data-name="Capa 1"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
    >
      <path
        className="cls-2"
        d="M24.26,23.84c0-.08.02-.15.02-.23V7.4c0-2.39-1.95-4.34-4.34-4.34s-4.34,1.95-4.34,4.34v16.21c0,.11.02.21.03.31-1.75,1.32-2.88,3.41-2.88,5.77,0,4,3.24,7.24,7.24,7.24s7.24-3.24,7.24-7.24c0-2.41-1.18-4.53-2.99-5.85Z"
      />
      <circle cx="20" cy="30.1" r="3.34" />
      <line className="cls-1" x1="20" y1="30.67" x2="20" y2="21.7" />
      <line className="cls-1" x1="16.07" y1="15.87" x2="19.41" y2="15.87" />
      <line className="cls-1" x1="16.07" y1="10.76" x2="19.41" y2="10.76" />
    </svg>
  )
}
TemperatureIcon.propTypes = {
  className: propTypes.string,
}
