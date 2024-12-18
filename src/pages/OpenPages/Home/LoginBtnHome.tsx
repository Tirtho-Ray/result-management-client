import { useNavigate } from "react-router-dom";

const LoginBtnHome = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={handleLoginClick}
        className="bg-slate-400 px-3 py-2 text-[12px] font-mono rounded-sm font-bold mt-2 mr-2"
      >
        Login
      </button>
      <button
        onClick={handleLoginClick}
        className="bg-slate-400 px-3 py-2 text-[12px] font-mono rounded-sm font-bold mt-2 mr-2"
      >
        Login
      </button>
    </div>
  );
};

export default LoginBtnHome;
