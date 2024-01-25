import Footer from "@/Components/Shared/Footer/Footer";
import Navbar from "@/Components/Shared/Navbar/Navbar";
import AuthProvider from "@/providers/AuthProvider";



const Layout = ({ children }) => {
    return (
        <AuthProvider>
            <div>
                <Navbar />
                {children}
                <Footer />
            </div>
        </AuthProvider>
        
    );
};

export default Layout;