import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../lib/ErrPage";
import OpenLayout from "../Layout/openLayout/OpenLayout";
import AdminLayout from "../Layout/adminLayout/AdminLayout";
import Home from "../pages/OpenPages/Home/Home";
import AdminHome from "../pages/AdminPages/AdminHome/AdminHome";
import ManageStudent from "../pages/AdminPages/ManageStudent/ManageStudent";
import ManageSubjects from "../pages/AdminPages/ManageSubject/ManageSubjects";
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
            },
            {
                path:"/admin/dashboard/subject",
                element:<ManageSubjects />
            }
        ]
            
    }
]);
export default router;
