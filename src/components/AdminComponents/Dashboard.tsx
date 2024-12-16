import { useAuth } from "../../Context/AuthContext";
import Sidebar from "./Sidebar";


const Dashboard = () => {
    const { user, isAuthenticated } = useAuth();
    console.log(user)
    if (!isAuthenticated) {
        return <div>You are not logged in</div>;
      }
    
    return (
        <div>
            
           <Sidebar />
          
        </div>
    );
};

export default Dashboard;