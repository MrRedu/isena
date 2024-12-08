import propTypes from 'prop-types'
export const Section = ({ children, className = '' }) => {
  return (
    <section className={`px-6 py-4 lg:px-12 lg:py-8 ${className}`}>
      {children}
    </section>
  )
}
Section.propTypes = {
  children: propTypes.node,
  className: propTypes.string,
}
