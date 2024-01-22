import Footer from "@/Components/Shared/Footer/Footer";
import Navbar from "@/Components/Shared/Navbar/Navbar";

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar/>
            <div className="min-h-screen">
            {children}
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;