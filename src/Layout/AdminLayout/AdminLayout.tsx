import { Outlet } from "react-router-dom";
import Dashboard from "../../components/AdminComponents/Dashboard";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="md:w-[170px] lg:w-52">
        <Dashboard />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-red-600 p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
