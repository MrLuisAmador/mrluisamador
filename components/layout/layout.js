import Nav from "../nav/nav"
import Footer from "../footer/footer"




const Layout = ({children}) => {
    return (
        <>
            <Nav />
            <div className="contentContainer">
                <main className="main-container">{children}</main>
                <Footer />
            </div>
        </>
    )
}

export default Layout;