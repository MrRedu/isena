import propTypes from 'prop-types'
export const HeartRateIcon = ({ className }) => {
  return (
    <svg data-name="Capa 1" viewBox="0 0 40 40" fill="none" stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
      <g id="heart-rate-pulse-graph">
        <path id="vector_2" data-name="vector 2" className="cls-1" d="M3.88,15.49c-.38-7.17,8.21-14.28,16.41-4.9,10.44-11.9,21.61,2.85,13.92,10.44l-13.92,12.87-10.93-10.11" />
        <path id="vector_2105" data-name="vector 2105" className="cls-1" d="M3.23,19.56h6.95l3.95-5.05,4.01,9.31,3.45-4.26h3.85" />
      </g>
    </svg>
  )
};
HeartRateIcon.propTypes = {
  className: propTypes.string
}