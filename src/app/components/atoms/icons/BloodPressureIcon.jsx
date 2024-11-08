import propTypes from 'prop-types'
export const BloodPressureIcon = ({ className }) => {
  return (
    <svg
      data-name="Capa 1"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
    >
      <g id="heart-rate-pulse-graph">
        <path
          id="vector_2"
          data-name="vector 2"
          className="cls-2"
          d="M19.99,25.29l-5.3-4.9c-2.89-2.9,1.32-8.51,5.3-3.97,3.97-4.53,8.22,1.09,5.3,3.97l-5.3,4.9Z"
        />
      </g>
      <g id="heart-rate-pulse-graph-2" data-name="heart-rate-pulse-graph">
        <path
          id="vector_2-2"
          data-name="vector 2"
          className="cls-1"
          d="M19.98,33.88l-13.9-12.86C-1.49,13.42,9.55-1.31,19.98,10.6c10.42-11.88,21.58,2.85,13.9,10.42l-13.9,12.86Z"
        />
      </g>
    </svg>
  )
}
BloodPressureIcon.propTypes = {
  className: propTypes.string,
}
