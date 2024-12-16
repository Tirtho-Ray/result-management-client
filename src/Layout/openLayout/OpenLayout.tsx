import { Outlet } from "react-router-dom";
// import Home from "../../pages/OpenPages/Home/Home";
import Navbar from "../../components/OpenComponents/Navbar";

const OpenLayout = () => {
    return (
        <div className="max-w-[420px] md:max-w-[760px] lg:max-w-[1200px] border mx-auto ">
           <Navbar />
           <Outlet />
        </div>
    );
};

export default OpenLayout;