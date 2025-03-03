import Result from "./Result";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* Login Button */}
      {/* <div className="self-end mt-4 mr-4">
        <LoginBtnHome />
      </div> */}
      
      {/* Main Content */}
      <div className="flex justify-center items-center h-full">
        <Result /> {/* This is where the result will be displayed */}
      </div>
    </div>
  );
};

export default Home;
