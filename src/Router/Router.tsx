import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import ErrorPage from "../lib/ErrPage";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Main />,
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
    }
]);
export default router;
