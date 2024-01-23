import Footer from "@/Components/Shared/Footer/Footer";
import Navbar from "@/Components/Shared/Navbar/Navbar";
import AuthProvider from "@/providers/AuthProvider";


const Layout = ({ children }) => {
    return (
<<<<<<< HEAD
        <div>
            <Navbar/>
            <div className="min-h-screen">
            {children}
            </div>
            <Footer/>
        </div>
=======
        <AuthProvider>
            <div>
                <Navbar />
                {children}
                <Footer />
            </div>
        </AuthProvider>
>>>>>>> 44ae0f58678650fba83946a553e8d06fae418430
    );
};

export default Layout;