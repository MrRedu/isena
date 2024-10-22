import propTypes from 'prop-types'

export default function Layout({ children }) {
  return (
    <>
      {/* <Header /> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}

Layout.propTypes = {
  children: propTypes.node,
}