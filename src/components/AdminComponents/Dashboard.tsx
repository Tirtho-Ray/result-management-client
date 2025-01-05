import { ToastContainer } from "react-toastify";
import { useAuth } from "../../Context/AuthContext";
import Sidebar from "./Sidebar";


const Dashboard = () => {
    // const { user, isAuthenticated } = useAuth();
    const { isAuthenticated } = useAuth();
    // console.log(user)
    if (!isAuthenticated) {
        return <div>You are not logged in</div>;
      }
    
    return (
        <div className="">
             <ToastContainer />
            
           <Sidebar />
          
        </div>
    );
};

export default Dashboard;