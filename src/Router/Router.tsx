import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../lib/ErrPage";

const router = createBrowserRouter([
    {
        path:"/",
        element:<></>,
        errorElement:<ErrorPage />,
        children:[
            {
                path:"/",
                element:<div>Home</div>
            },
            {
                path:"about",
                element:<div>About</div>
            },
            {
                path:"contact",
                element:<div>Contact</div>
            }
        ]
    },
    // this is for ad admin routes
    {

    }
]);
export default router;
