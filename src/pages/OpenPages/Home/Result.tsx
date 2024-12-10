const Result = () => {
  return (
    <div>
      <div className="flex justify-center mt-4">
        <div className="h-28 w-[300px] md:h-32 md:w-[600px] lg:h-32 lg:w-[500px] bg-stone-500 rounded-md">
          <p className="font-bold font-serif text-center mt-5">
            Search Your result
          </p>
          {/* input filled  for search result  */}
          <div className="flex justify-center mt-3">
          <div className="flex items-center">
                <div className="ml-3">
                   
                    <input
                     className="rounded-sm px-4 py-2 w-40 h-8 md:w-52 lg:w-64 focus:outline-none"
                     type="text" name="" id="" placeholder="Roll" />
                     
                </div>
                <div>
                    <button className="px-3 py-[7px] bg-blue-500 text-[12px] ">Search</button>
                </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
