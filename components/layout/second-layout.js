/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"

import Nav from "../nav/nav"
import Footer from "../footer/footer"
import "./second-layout.scss"

const SecondLayout = ({ children }) => (
      <>
        <Nav />
        <div className="content-container">
          <main className="main-container">{children}</main>
          <Footer />
        </div>
      </>
)


export default SecondLayout
