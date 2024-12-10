import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../lib/ErrPage";
import OpenLayout from "../Layout/openLayout/OpenLayout";
import AdminLayout from "../Layout/adminLayout/AdminLayout";
import Home from "../pages/OpenPages/Home/Home";

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
        path:"/",
        element:<AdminLayout/>,
        errorElement:<ErrorPage />,
        children:[
            {
                path:"admin/dashboard",
                element:<div>Admin Dashboard</div>
            }
        ]
            
    }
]);
export default router;
