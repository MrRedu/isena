import propTypes from 'prop-types'

export const Label = ({ children, htmlFor }) => {
  return (
    <label className="block mb-2 text-sm text-cerise-600" htmlFor={htmlFor}>
      {children}
    </label>
  )
};


Label.propTypes = {
  children: propTypes.node,
  htmlFor: propTypes.string
};