import { Outlet } from "react-router-dom";
import Dashboard from "../../components/AdminComponents/Dashboard";


const AdminLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Dashboard />
      
      {/* Main Content */}
      <div className="flex-1 ml-16 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
