import propTypes from 'prop-types'
export const WeightIcon = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" data-name="Capa 1" viewBox="0 0 40 40" fill="none" stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
      <path className="cls-2" d="M3.18,24.32c0,2.97.77,5.77,2.13,8.19l29.41-.04c1.34-2.42,2.11-5.2,2.11-8.15,0-9.29-7.53-16.82-16.82-16.82S3.18,15.03,3.18,24.32Z" />
      <path className="cls-1" d="M30.78,24.58c0-5.96-4.83-10.78-10.78-10.78s-10.78,4.83-10.78,10.78" />
      <path d="M22.92,20.64l-5.85,3.17c-.74.75-.74,1.95,0,2.69s1.95.75,2.7,0l3.15-5.86Z" />
    </svg>
  )
};
WeightIcon.propTypes = {
  className: propTypes.string
}