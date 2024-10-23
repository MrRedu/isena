import propTypes from 'prop-types'
import { Header } from "@/components/organisms/ui/Header"

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}

Layout.propTypes = {
  children: propTypes.node,
}