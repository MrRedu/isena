import propTypes from 'prop-types'
import Link from "next/link";

export const Hyperlink = ({ href }) => {
  return (
    <Link
      href={href}
      className="ml-1 text-sm font-semibold text-slate-700 underline"
    >
      {`Crear cuenta`}
    </Link>
  )
};

Hyperlink.propTypes = {
  href: propTypes.string,
};