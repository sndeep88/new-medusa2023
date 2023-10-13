import Footer from "@modules/layout/components/footer"
import Nav from "@modules/layout/templates/nav"
import React from "react"

const Layout: React.FC<{ storeData?: any }> = ({ children, storeData }) => {
  return (
    <div>
      <Nav storeData={storeData} />
      <main className="relative">{children}</main>
      <Footer storeData={storeData} />
    </div>
  )
}

export default Layout
