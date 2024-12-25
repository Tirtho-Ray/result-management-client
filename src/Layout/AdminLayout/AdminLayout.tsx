import { Outlet } from "react-router-dom";
import Dashboard from "../../components/AdminComponents/Dashboard";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="md:w-[180px] lg:w-56">
        <Dashboard />
      </div>

      {/* Main Content */}
      <div className="flex-1  overflow-y-auto bg-gradient-to-r from-gray-100 to-gray-200">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
