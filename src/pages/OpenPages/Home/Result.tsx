const Result = () => {
    return (
      <div>
        <div className="flex justify-center mt-4">
          <div className="h-40 w-[390px] md:h-32 md:w-[600px] lg:h-32 lg:w-[700px] bg-stone-500 rounded-md">
            <p className="font-bold font-serif text-center mt-5">Search Your Result</p>
            {/* Input filled for search result */}
            <div className="flex justify-center mt-3">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 place-items-center ">
                <div>
                  <input
                    className="rounded-sm px-4 py-2 w-40 h-8 md:w-44  md:h-10 lg:w-52 focus:outline-none"
                    type="text"
                    placeholder="Roll"
                  />
                </div>
                <div>
                  <select
                    className="rounded-sm px-4 w-40 h-8 md:w-44 md:h-10 lg:w-52 focus:outline-none"
                    name=""
                    id=""
                  >
                    <option value="">Select Division</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
                <div className="flex justify-center">
                  <button className="px-4 py-[7px] md:py-[8px] bg-blue-500 text-white font-bold w-full md:w-auto rounded-sm ">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Result;
  