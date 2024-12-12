const Result = () => {
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <div className="bg-white shadow-lg rounded-lg w-[90%] max-w-2xl p-6">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-center text-gray-700 mb-4">
            Search Your Result
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Roll Input */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Roll Number</label>
              <input
                className="rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                type="text"
                placeholder="Enter Roll"
              />
            </div>
            {/* Semester Select */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Semester</label>
              <select
                className="rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                name="semester"
                id="semester"
              >
                <option value="">Select Semester</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </div>
            {/* Search Button */}
            <div className="flex items-end">
              <button className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Result;
  