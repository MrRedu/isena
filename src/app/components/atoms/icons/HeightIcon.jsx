import propTypes from 'prop-types'
export const HeightIcon = ({ className }) => {
  return (
    <svg data-name="Capa 1" viewBox="0 0 40 40" fill="none" stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
      <rect className="cls-1" x="12.47" y="3.24" width="15.06" height="33.51" transform="translate(20 -8.28) rotate(45)" />
      <g>
        <line className="cls-1" x1="27.34" y1="13.62" x2="21.87" y2="8.14" />
        <line className="cls-1" x1="13.62" y1="27.34" x2="8.14" y2="21.87" />
        <line className="cls-1" x1="17.62" y1="18.05" x2="14.46" y2="14.89" />
      </g>
    </svg>
  )
};
HeightIcon.propTypes = {
  className: propTypes.string
}