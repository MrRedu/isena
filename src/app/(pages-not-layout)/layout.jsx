import propTypes from 'prop-types'

export default function Layout({ children }) {
  return (
    <>
      <h2>Header</h2>
      {children}
      <footer>Footer</footer>
    </>
  )
}

Layout.propTypes = {
  children: propTypes.node,
}