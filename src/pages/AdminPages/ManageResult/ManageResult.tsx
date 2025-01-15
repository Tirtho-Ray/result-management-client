/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../Api/Api";
import { RTSemester, RTStudent } from "../../../types/types";

interface RTApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

type RTApiResponseCreate = {
  success: boolean;
  message: string;
  data: [];
};

type TSubject = {
  _id: string;
  name: string;
  subCode: number;
  credit: number;
  semesterId: { _id: string; name: string };
  departmentId: { _id: string; name: string };
};

const ManageResult = () => {
  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<RTStudent[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<RTStudent | null>(
    null
  );
  const [semesters, setSemesters] = useState<RTSemester[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [subjects, setSubjects] = useState<TSubject[]>([]);
  const [subjectMarks, setSubjectMarks] = useState<Record<string, number>>({});
  const [, setLoading] = useState<boolean>(false);
  const [, setSubjectLoading] = useState<boolean>(false);

  // Fetch semesters on component mount
  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        setLoading(true);
        const response = await api.get<RTApiResponse<RTSemester[]>>(
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

  // Fetch subjects when semester changes
  useEffect(() => {
    if (!selectedSemester) return;

    const fetchSubjects = async () => {
      setSubjectLoading(true);
      try {
        const response = await api.get<RTApiResponse<TSubject[]>>(
          "/api/subject"
        );
        const filteredSubjects = response.data.data.filter(
          (subject) => subject.semesterId._id === selectedSemester
        );
        setSubjects(filteredSubjects);
      } catch (err) {
        toast.error("Failed to fetch subjects.");
      } finally {
        setSubjectLoading(false);
      }
    };

    fetchSubjects();
  }, [selectedSemester]);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);

    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      const response = await api.get<RTApiResponse<{ students: RTStudent[] }>>(
        "/api/students"
      );
      const students: RTStudent[] = response.data.data.students;
      const filtered = students.filter((student) =>
        student.boardRoll.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } catch (err) {
      toast.error("Failed to fetch suggestions.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (student: RTStudent) => {
    setSelectedStudent(student);
    setSearch("");
    setSuggestions([]);
  };

  const handleMarksChange = (subjectId: string, marks: number) => {
    setSubjectMarks((prev) => ({
      ...prev,
      [subjectId]: marks,
    }));
  };

  const handleSubmit = async () => {
    if (!selectedStudent) {
      toast.error("Please select a student.");
      return;
    }

    if (!selectedSemester) {
      toast.error("Please select a semester.");
      return;
    }

    const missingMarks = subjects.some(
      (subject) => subjectMarks[subject._id] === undefined
    );

    if (missingMarks) {
      toast.error("Please enter marks for all subjects.");
      return;
    }

    const resultsPayload = {
      studentId: selectedStudent._id,
      semesterId: selectedSemester,
      results: subjects.map((subject) => ({
        subjectId: subject._id,
        obtainedMarks: subjectMarks[subject._id] || 0,
      })),
    };

    try {
      const response = await api.post<RTApiResponseCreate>(
        "api/result/create-result",
        resultsPayload
      );
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Results submitted successfully!",
        }).then(() => {
          handleFullReset(); // Reset the form
        });
      } else {
        toast.error(response.data.message || "Failed to submit results.");
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const handleFullReset = () => {
    setSearch("");
    setSuggestions([]);
    setSelectedStudent(null);
    setSelectedSemester("");
    setSubjects([]);
    setSubjectMarks({});
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 shadow-md rounded-lg">
      <h1 className="text-center font-bold text-3xl py-4 text-blue-700">
        Manage Results
      </h1>

      <div className="relative mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search by Board Roll
        </label>
        <input
          type="text"
          placeholder="Enter Board Roll"
          value={search}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-40 overflow-y-auto z-50">
            {suggestions.map((student) => (
              <li
                key={student._id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(student)}
              >
                {student.boardRoll} - {student.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedStudent && (
        <div className="bg-green-100 p-4 rounded-lg mb-6">
          <h2 className="font-semibold text-lg">
            Selected Student:{" "}
            <span className="text-green-700">{selectedStudent.name}</span>
          </h2>
        </div>
      )}

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

      {subjects.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Subjects</h3>
          {subjects.map((subject) => (
            <div key={subject._id} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {subject.name} ({subject.subCode})
              </label>
              <input
                type="number"
                value={subjectMarks[subject._id] || ""}
                onChange={(e) =>
                  handleMarksChange(subject._id, Number(e.target.value))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          className={`flex-1 py-2 rounded-lg text-white ${
            selectedStudent && selectedSemester
              ? "bg-blue-500"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!selectedStudent || !selectedSemester}
        >
          Submit Results
        </button>
        <button
          onClick={handleFullReset}
          className="flex-1 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600"
        >
          Reset Full Form
        </button>
      </div>
    </div>
  );
};

export default ManageResult;
