import propTypes from 'prop-types'
export const Input = ({
  type = 'text',
  id = '',
  name,
  value,
  placeholder,
  onChange,
  isRequired = false,
  readOnly = false,
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={isRequired}
      className={`
        w-full bg-transparent placeholder:text-slate-400 text-cerise-700 text-sm border border-cerise-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-cerise-400 hover:border-cerise-300 shadow-sm focus:shadow
        `}
      // ${readOnly ? 'cursor-not-allowed bg-gray-200 user-select-none' : ''}
      readOnly={readOnly}
    />
  )
}
Input.propTypes = {
  type: propTypes.string,
  id: propTypes.string,
  name: propTypes.string,
  value: propTypes.string,
  placeholder: propTypes.string,
  onChange: propTypes.func,
  isRequired: propTypes.bool,
  readOnly: propTypes.bool,
}
