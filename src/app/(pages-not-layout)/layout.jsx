import propTypes from 'prop-types'

export default function Layout({ children }) {
  return <>{children}</>
}

Layout.propTypes = {
  children: propTypes.node,
}
