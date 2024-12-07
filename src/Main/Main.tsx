import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";


const Main = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;