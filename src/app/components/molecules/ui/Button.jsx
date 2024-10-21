import propTypes from 'prop-types'
export const Button = ({ children, type = 'button' }) => {
  return (
    <button
      className="w-full rounded-md bg-cerise-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-cerise-700 focus:shadow-none active:bg-cerise-700 hover:bg-cerise-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type={type}
    >
      {children}
    </button>
  )
};

Button.propTypes = {
  children: propTypes.node,
  type: propTypes.string
};