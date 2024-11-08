import propTypes from 'prop-types'
export const LungsIcon = ({ className }) => {
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
      <g>
        <path className="cls-1" d="M20,4.98v13.79s1.85,3.64,6.7,5.17" />
        <path className="cls-1" d="M20,4.98v13.79s-1.85,3.64-6.7,5.17" />
      </g>
      <path
        className="cls-1"
        d="M25.07,13.41h2.84c1.55,0,3.02.71,3.99,1.93l2.35,2.96c.96,1.21,1.49,2.72,1.49,4.27v7.63c-1.47,7.28-12.05,5.94-13.02-1.47"
      />
      <path
        className="cls-1"
        d="M14.93,13.41h-2.84c-1.55,0-3.02.71-3.99,1.93l-2.35,2.96c-.96,1.21-1.49,2.72-1.49,4.27v7.63c1.47,7.28,12.05,5.94,13.02-1.47"
      />
    </svg>
  )
}
LungsIcon.propTypes = {
  className: propTypes.string,
}
