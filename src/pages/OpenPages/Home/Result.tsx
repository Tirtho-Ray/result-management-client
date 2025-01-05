import { useEffect, useState } from "react";
import api from "../../../Api/Api";
import { toast } from "react-toastify";
import { RTSemester } from "../../../types/types";
import { gsap } from "gsap";
import { jsPDF } from "jspdf";

interface RApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const Result = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [semesters, setSemesters] = useState<RTSemester[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [boardRoll, setBoardRoll] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        setLoading(true);
        const response = await api.get<RApiResponse<RTSemester[]>>(
          "/api/semesters"
        );
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
    setTimeout(async () => {
      try {
        const response = await api.get<RApiResponse<any>>(
          `/api/result/my-result?boardRoll=${boardRoll}&semesterId=${selectedSemester}`
        );
        if (response.data.success) {
          setResult(response.data.data);
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
    }, 1000);
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
      duration: 0.5,
      onComplete: () => setIsModalOpen(false),
    });
    document.body.style.overflow = "auto";
  };

  const generatePDF = () => {
    if (!result) {
      toast.error("No result data available to generate PDF.");
      return;
    }
  
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const startX = 20; // Left margin
    let y = 20; // Top margin
  
    // Header: Combine Name, Semester, and GPA in one line
    pdf.setFontSize(10);
    const headerText = `Result for ${result.studentId.name} | Semester: ${result.semesterId.name} | GPA: ${result.GPA}`;
    pdf.text(headerText, pageWidth / 2, y, { align: "center" });
    y += 10;
  
    // Column widths
    const colWidths = {
      subject: 60,
      code: 30,
      totalMarks: 40,
      obtainedMarks: 40,
    };
  
    // Table Header
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.rect(startX, y, pageWidth - startX * 2, 10); // Outer rectangle
    pdf.text("Subject", startX + 2, y + 7);
    pdf.text("Code", startX + colWidths.subject + 2, y + 7);
    pdf.text("Total Marks", startX + colWidths.subject + colWidths.code + 2, y + 7);
    pdf.text("Marks Obtained", startX + colWidths.subject + colWidths.code + colWidths.totalMarks + 2, y + 7);
    y += 10;
  
    // Table Data
    pdf.setFont("helvetica", "normal");
    result.results.forEach((subject: any) => {
      // Draw Row Border
      pdf.rect(startX, y, pageWidth - startX * 2, 10);
  
      // Add Text Data
      const subjectName = subject.subjectId.name.length > 30
        ? `${subject.subjectId.name.slice(0, 27)}...`
        : subject.subjectId.name;
  
      pdf.text(subjectName, startX + 2, y + 7); // Subject
      pdf.text(subject.subjectId.subCode.toString(), startX + colWidths.subject + 2, y + 7); // Code
      pdf.text(subject.subjectId.mark.toString(), startX + colWidths.subject + colWidths.code + 2, y + 7); // Total Marks
      pdf.text(subject.obtainedMarks.toString(), startX + colWidths.subject + colWidths.code + colWidths.totalMarks + 2, y + 7); // Marks Obtained
      y += 10;
    });
  
    // Save the PDF
    pdf.save("result.pdf");
  };
  
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg w-[90%] max-w-2xl p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Search Your Result
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-content-start">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Roll Number</label>
            <input
              className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              type="text"
              placeholder="Enter Roll"
              value={boardRoll}
              onChange={(e) => setBoardRoll(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Semester
            </label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Semester</option>
              {semesters.map((semester) => (
                <option key={semester._id} value={semester._id}>
                  {semester.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
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
            <h3 className="text-xl font-semibold text-center text-gray-700 mb-6">
              {result ? `Result for ${result.studentId.name}` : "No Results Found"}
            </h3>
            <div id="result-content">
              {!result ? (
                <div className="text-center text-gray-500">
                  <p className="text-xl">
                    Sorry, no results were found for your search.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto text-gray-700 border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-blue-100">
                        <th className="px-4 py-2 text-left border border-gray-300 text-sm">
                          Subject
                        </th>
                        <th className="px-4 py-2 text-left border border-gray-300 text-sm">
                          Code
                        </th>
                        <th className="px-4 py-2 text-left border border-gray-300 text-sm">
                          Total Marks
                        </th>
                        <th className="px-4 py-2 text-left border border-gray-300 text-sm">
                          Marks Obtained
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.results.map((subject: any, index: number) => (
                        <tr
                          key={subject._id}
                          className={
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }
                        >
                          <td className="px-4 py-2 border border-gray-300 text-sm">
                            {subject.subjectId.name}
                          </td>
                          <td className="px-4 py-2 border border-gray-300 text-sm">
                            {subject.subjectId.subCode}
                          </td>
                          <td className="px-4 py-2 border border-gray-300 text-sm">
                            {subject.subjectId.mark}
                          </td>
                          <td className="px-4 py-2 border border-gray-300 text-sm">
                            {subject.obtainedMarks}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <p className="font-semibold text-center mt-6">
                GPA: {result?.GPA}
              </p>
            </div>
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Close
              </button>
              <button
                onClick={generatePDF}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
