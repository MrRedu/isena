import propTypes from 'prop-types'
export const Section = ({ children, className = '' }) => {
  return <section className={`px-12 py-8 ${className}`}>{children}</section>
}
Section.propTypes = {
  children: propTypes.node,
  className: propTypes.string,
}
