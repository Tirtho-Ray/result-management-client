import { Outlet } from "react-router-dom";
// import Home from "../../pages/OpenPages/Home/Home";
import Navbar from "../../components/OpenComponents/Navbar";
import Footer from "../../components/OpenComponents/Footer";

const OpenLayout = () => {
    return (
        <div className="max-w-[420px] md:max-w-[770px] lg:max-w-[1400px] border mx-auto ">
           <div className="">
           <Navbar />
           </div>
           <Outlet />
           <Footer />
        </div>
    );
};

export default OpenLayout;