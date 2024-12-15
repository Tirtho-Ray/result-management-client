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
      <div className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
