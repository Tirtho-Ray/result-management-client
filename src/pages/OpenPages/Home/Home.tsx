import LoginBtnHome from "./LoginBtnHome";
import Result from "./Result";

const Home = () => {
  return (
    <div className="relative min-h-screen">
      {/* Login Button */}
      <div className="absolute top-4 right-4">
        <LoginBtnHome />
      </div>
      
      {/* Main Content */}
      <div className="flex justify-center items-center h-full">
        <Result /> {/* This is where the result will be displayed */}
      </div>
    </div>
  );
};

export default Home;
