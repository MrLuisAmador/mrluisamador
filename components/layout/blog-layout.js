import Nav from "../nav/nav"
import Footer from "../footer/footer"
import "./blog-layout.module.scss"

const BlogLayout = ({ children }) => (
      <>
        <div className="content-container">
          <main className="main-container">{children}</main>
          <Footer />
        </div>
      </>
)


export default BlogLayout
