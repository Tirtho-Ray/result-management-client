import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../lib/ErrPage";
import OpenLayout from "../Layout/openLayout/OpenLayout";
import AdminLayout from "../Layout/adminLayout/AdminLayout";
import Home from "../pages/OpenPages/Home/Home";
import AdminHome from "../pages/AdminPages/AdminHome/AdminHome";
import ManageStudent from "../pages/AdminPages/ManageStudent/ManageStudent";
import ManageSubjects from "../pages/AdminPages/ManageSubject/ManageSubjects";
import Login from "../Auth/Login/Login";
// import Sidebar from "../components/AdminComponents/Sidebar";
import ProtectedRoute from './../components/ProtectedRoute/ProtectedRoute';
import Cgpa from "../pages/OpenPages/CgpaCalculater/Cgpa";
import UpdateSubject from "../pages/AdminPages/ManageSubject/UpdateSubject";
import UpdateStudent from "../pages/AdminPages/ManageStudent/UpdateStudent";

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
            {
                path:"/calculate-cgpa",
                element:<Cgpa />
            },
            {
                path:"/login",
                element:<Login />
            },
        ]
    },
    // this is for ad admin routes
    {
        path:"/admin/dashboard",
        element:<ProtectedRoute >
            <AdminLayout />
            </ProtectedRoute>,
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
                path:"/admin/dashboard/student/:id",
                element:<UpdateStudent />
            },
            {
                path:"/admin/dashboard/subject",
                element:<ManageSubjects />
            },
            {
                path:`/admin/dashboard/subject/:id`,
                element:<UpdateSubject />
            },
            
        ]
            
    }
]);
export default router;
