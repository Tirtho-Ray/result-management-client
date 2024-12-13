import { Outlet } from "react-router-dom";
import Dashboard from "../../components/AdminComponents/Dashboard";

const AdminLayout = () => {
    return (
        <div>
            <Dashboard />
        </div>
    );
};

export default AdminLayout;