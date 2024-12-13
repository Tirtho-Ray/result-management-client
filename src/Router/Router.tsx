import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../lib/ErrPage";
import OpenLayout from "../Layout/openLayout/OpenLayout";
import AdminLayout from "../Layout/adminLayout/AdminLayout";
import Home from "../pages/OpenPages/Home/Home";
import AdminHome from "../pages/AdminPages/Home/Home";
import ManageStudent from "../pages/AdminPages/Home/ManageStudent";
// import Sidebar from "../components/AdminComponents/Sidebar";

const router = createBrowserRouter([
    // This is for open routes
    {
        path:"/",
        element:<OpenLayout />,
        errorElement:<ErrorPage />,
        children:[
            {
                path:"/",
                element:<Home />
            },
        ]
    },
    // this is for ad admin routes
    {
        path:"/admin/dashboard",
        element:<AdminLayout/>,
        errorElement:<ErrorPage />,
        children:[
            {
                path:"/admin/dashboard/home",
                element:<AdminHome />
            },
            {
                path:"/admin/dashboard/student",
                element:<ManageStudent />
            }
        ]
            
    }
]);
export default router;
