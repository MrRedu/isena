'use client'
import propTypes from 'prop-types'
export const CardReport = ({ title, subtitle, icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-blush-100 overflow-hidden shadow rounded-lg w-full cursor-pointer"
    >
      <div className="px-4 py-5 sm:p-6 flex gap-4 items-center">
        {icon}
        <div>
          <div className="mt-1 text-xl leading-9 font-semibold text-blush-950">
            {title}
          </div>
          <div className="text-sm leading-5 font-medium text-gray-500 truncate">
            {subtitle}
          </div>
        </div>
      </div>
    </div>
  )
}

CardReport.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  icon: propTypes.node.isRequired,
  onClick: propTypes.func,
}
