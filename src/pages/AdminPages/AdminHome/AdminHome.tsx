import React, { useState, useEffect, useRef } from "react";
import api from "../../../Api/Api";
import gsap from "gsap"; // Import GSAP

type Student = {
  _id: string;
  name: string;
  departmentId: { _id: string; name: string };
  semesterId: { _id: string; name: string };
};

type DepartmentData = Record<string, number[]>;

const AdminHome: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [departmentData, setDepartmentData] = useState<DepartmentData>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const modalRef = useRef<HTMLDivElement | null>(null); // Reference to modal

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get<{ success: boolean; data: { students: Student[] } }>("/api/students");
        if (response.data.success) {
          const fetchedStudents = response.data.data.students; // Access students from the correct path
          setStudents(fetchedStudents);
          processStudentData(fetchedStudents); // Pass the student array to process
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false); // Set loading to false when data is fetched or on error
      }
    };

    fetchStudents();
  }, []);

  const processStudentData = (students: Student[]) => {
    if (!Array.isArray(students)) {
      console.error("Expected students to be an array, but got", students);
      return;
    }

    const deptData: DepartmentData = {};

    students.forEach((student) => {
      const department = student.departmentId.name;
      const semesterName = student.semesterId.name;
      const semesterNumber = parseSemesterName(semesterName);

      if (!deptData[department]) {
        deptData[department] = new Array(8).fill(0); // Initialize for 8 semesters
      }

      if (semesterNumber >= 1 && semesterNumber <= 8) {
        deptData[department][semesterNumber - 1] += 1; // Increment count for the semester
      }
    });

    setDepartmentData(deptData);
  };

  const parseSemesterName = (name: string): number => {
    const semesterMap: Record<string, number> = {
      First: 1,
      Second: 2,
      Third: 3,
      Fourth: 4,
      Fifth: 5,
      Six: 6,
      Seventh: 7,
      Eighth: 8,
    };

    return semesterMap[name] || parseInt(name.match(/\d+/)?.[0] || "0", 10);
  };

  const openModal = (dept: string) => {
    setSelectedDept(dept);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => setIsModalOpen(false), // Close modal after animation
      });
    }
  };

  const totalStudents = students.length;

  return (
    <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Student Data Overview</h1>

      {/* Total Students Section with Animations */}
      <div className="mb-8 text-center">
        <div className="bg-gradient-to-r from-teal-400 to-purple-500 text-white rounded-lg p-6 shadow-xl transform transition-all duration-500">
          <h2 className="text-3xl font-semibold mb-2 flex justify-center items-center gap-1 md:gap-3">
            Total Students
            <p className="text-4xl font-extrabold animate__animated animate__fadeIn">{totalStudents}</p>
          </h2>
        </div>
      </div>

      {/* Loader - Shows when data is loading */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        // Department Cards - Shows when data is loaded
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Object.keys(departmentData).map((dept) => (
            <div
              key={dept}
              onClick={() => openModal(dept)}
              className="bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-500 text-gray-900 rounded-lg shadow-lg p-6 hover:scale-105 transform transition-transform duration-300 cursor-pointer"
            >
              <h2 className="text-2xl font-bold mb-4 text-center">{dept} Department</h2>
              <p className="text-gray-800 font-serif font-semibold">
                Total Students:{" "}
                <span className="font-extrabold">
                  {departmentData[dept]?.reduce((a, b) => a + b, 0) || 0}
                </span>
              </p>
              <p className="text-gray-800 font-serif font-semibold">
                Active Semesters: <span className="font-semibold">1 to 8</span>
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedDept && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg p-8 w-11/12 max-w-lg transform scale-100 transition-transform duration-300"
          >
            <h3 className="text-3xl font-bold mb-6 text-gray-800 ">
              {selectedDept} Department - Semester Details
            </h3>
            <ul className="space-y-3">
              {departmentData[selectedDept]?.map((count, index) => (
                <li key={index} className="flex justify-between">
                  <span className="text-gray-700 font-medium">Semester {index + 1}:</span>
                  <span className="text-gray-900 font-bold">{count} students</span>
                </li>
              ))}
            </ul>
            <button
              onClick={closeModal}
              className="mt-6 px-6 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-colors duration-150"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
