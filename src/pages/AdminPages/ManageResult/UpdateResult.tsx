/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import api from "../../../Api/Api";
import { toast } from "react-toastify";
import { RTSemester } from "../../../types/types";
import { gsap } from "gsap";

interface RApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const UpdateResult = () => {
  const [, setLoading] = useState<boolean>(false);
  const [semesters, setSemesters] = useState<RTSemester[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [boardRoll, setBoardRoll] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [updatedMarks, setUpdatedMarks] = useState<any>([]);

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        setLoading(true);
        const response = await api.get<RApiResponse<RTSemester[]>>("/api/semesters");
        setSemesters(response.data.data);
      } catch (err) {
        toast.error("Failed to fetch semesters.");
      } finally {
        setLoading(false);
      }
    };

    fetchSemesters();
  }, []);

  const handleSearch = async () => {
    if (!boardRoll || !selectedSemester) {
      toast.error("Please enter both Roll Number and Semester.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.get<RApiResponse<any>>(
        `/api/result/my-result?boardRoll=${boardRoll}&semesterId=${selectedSemester}`
      );
      if (response.data.success) {
        setResult(response.data.data);
        setUpdatedMarks(response.data.data.results.map((subject: any) => ({
          id: subject._id,
          marks: subject.obtainedMarks
        })));
        openModal();
      } else {
        setResult(null);
        openModal();
      }
    } catch (err) {
      toast.error("Failed to fetch result.");
      setResult(null);
      openModal();
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkChange = (subjectId: string, newMarks: number) => {
    setUpdatedMarks((prevMarks:any) => {
      return prevMarks.map((subject: any) =>
        subject.id === subjectId ? { ...subject, marks: newMarks } : subject
      );
    });
  };

  const handleUpdate = async () => {
    try {
      // Adjust the format to match backend expectations
      const formattedMarks = updatedMarks.map((mark: any) => ({
        subjectId: mark.id,  // Update `id` to `subjectId`
        obtainedMarks: mark.marks,  // Update `marks` to `obtainedMarks`
      }));
  
      const response = await api.put<any>("/api/result/update-obtained-marks", {
        resultId: result._id,
        updatedMarks: formattedMarks,  // Send the formatted updatedMarks
      });
  
      if (response.data.success) {
        toast.success("Result updated successfully.");
        closeModal();  // Close the modal after a successful update
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Failed to update result.");
    }
  };
  

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
    gsap.fromTo(
      ".modal-container",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5 }
    );
  };

    const closeModal = () => {
        gsap.to(".modal-container", {
          opacity: 0,
          scale: 0.8,
          duration: 0.1,
          onComplete: () => setIsModalOpen(false),  // Close modal after animation
        });
        document.body.style.overflow = "auto";
      };
      

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white rounded-lg max-w-2xl p-8">
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-slate-300 shadow-xl rounded-lg max-w-3xl p-8">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Search Your Result</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Roll Number Input */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Roll Number</label>
                <input
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
                  type="text"
                  placeholder="Enter Roll"
                  value={boardRoll}
                  onChange={(e) => setBoardRoll(e.target.value)}
                />
              </div>

              {/* Select Semester Dropdown */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Select Semester</label>
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Semester</option>
                  {semesters.map((semester) => (
                    <option key={semester._id} value={semester._id}>
                      {semester.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <div className="flex justify-center items-center">
                <button
                  onClick={handleSearch}
                  className="w-full sm:w-auto bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 md:mt-5"
                >
                  {isLoading ? "Searching..." : "Search"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="text-white font-bold text-xl">Loading...</div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay fixed top-0 left-0 w-full h-full flex justify-center items-center p-1 md:p-3 lg:p-6 bg-slate-200 z-50">
          <div className="modal-container bg-white rounded-lg p-8 w-[90%] max-w-4xl shadow-xl transform transition-all">
            <h3 className="font-semibold text-gray-700 mb-6 flex justify-center text-sm">
              {result ? (
                <div className="flex justify-center gap-4">
                  <div className="font-semibold">{`Result For: ${result.studentName || "N/A"}`}</div>
                  <div className="font-semibold">{`Board Roll: ${result.boardRoll || "N/A"}`}</div>
                  <div className="font-semibold">{`Semester: ${result.semester || "N/A"}`}</div>
                  <div className="font-semibold">{`Status: ${result.status || "N/A"}`}</div>
                </div>
              ) : (
                "No Results Found"
              )}
            </h3>
            <div id="result-content">
              {!result ? (
                <div className="text-center text-gray-500">
                  <p className="text-xl">Sorry, no results were found for your search.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto text-gray-700 border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-blue-100">
                        <th className="px-4 py-2 text-left border border-gray-300 text-sm">Subject</th>
                        <th className="px-4 py-2 text-left border border-gray-300 text-sm">Code</th>
                        <th className="px-4 py-2 text-left border border-gray-300 text-sm">Obtained Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.results.map((subject: any, index: number) => (
                        <tr
                          key={subject._id || `${subject.subCode}-${subject.subjectName}-${index}`}
                          className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                        >
                          <td className="px-4 py-2 border border-gray-300 text-sm">{subject.subjectName}</td>
                          <td className="px-4 py-2 border border-gray-300 text-sm">{subject.subCode}</td>
                          <td className="px-4 py-2 border border-gray-300 text-sm">
                            <input
                              type="number"
                              value={updatedMarks.find((mark: any) => mark.id === subject._id)?.marks || subject.obtainedMarks}
                              onChange={(e) =>
                                handleMarkChange(subject._id, parseInt(e.target.value, 10))
                              }
                              className="w-full px-4 py-2 rounded-md border border-gray-300"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="flex justify-end mt-1">
              <span className="block font-bold">{result ? `GPA: ${result.GPA || "N/A"}` : "No Results Found"}</span>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Update Result
              </button>
              <button
                onClick={closeModal}
                className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateResult;
