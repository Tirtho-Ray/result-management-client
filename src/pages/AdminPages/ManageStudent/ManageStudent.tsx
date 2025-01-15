import React, { useState, useEffect } from "react";
import api from "../../../Api/Api";
import CreateStudentModal from "./createStudentModal";
import { useNavigate } from "react-router-dom";

type Student = {
  _id: string;
  name: string;
  email: string;
  boardRoll: string;
  collageRoll: string;
  departmentId: { _id: string; name: string };
  semesterId: { _id: string; name: string };
};



const ManageStudent: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await api.get<{ success: boolean; data: any }>("/api/students");
        // console.log(response.data);  // Log to ensure correct data is fetched

        if (response.data.success && response.data.data && Array.isArray(response.data.data.students)) {
          setStudents(response.data.data.students);  // Store all students
          setFilteredStudents(response.data.data.students.slice(0, 10)); // Initially show only the first 2 students
        } else {
          console.error("Unexpected data structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter students based on collageRoll or boardRoll
    const filtered = students.filter(
      (student) =>
        student.boardRoll.toLowerCase().includes(term) ||
        student.collageRoll.toLowerCase().includes(term) ||
        student.name.toLowerCase().includes(term)
    );
    setFilteredStudents(filtered.slice(0, 2)); // Show only first 2 filtered results
  };


//   create a list of students

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSaveStudent = (newStudent:any) => {
    setStudents((prevStudents) => [newStudent, ...prevStudents]); // Add to the beginning of the array
    setFilteredStudents((prevStudents) => [newStudent, ...prevStudents.slice(0, 9)]); // Update filtered list
  };;

  const handleCreateStudent = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };


  // update student
  const handleUpdateStudent = (student:Student) =>{
    navigate(`/admin/dashboard/student/${student._id}`,{ state: { student } })
  }


  


  return (
    <>
    <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen  ">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Manage Students</h1>

      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        {/* Search Field */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by Roll or Collage Roll..."
          className="px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 md:mb-0"
        />

        {/* Create Button */}
        <button
          onClick={handleCreateStudent}
          className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition-all"
        >
          + Create Student
        </button>
      </div>

      {/* Responsive Table */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-sm uppercase">Board Roll</th>
                <th className="px-6 py-3 text-left font-medium text-sm uppercase">Collage Roll</th>
                <th className="px-6 py-3 text-left font-medium text-sm uppercase">Name</th>
                <th className="px-6 py-3 text-left font-medium text-sm uppercase">Department</th>
                <th className="px-6 py-3 text-left font-medium text-sm uppercase">Semester</th>
                <th className="px-6 py-3 text-center font-medium text-sm uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <tr
                    key={student._id}
                    className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                  >
                    <td className="px-6 py-4 text-gray-800">{student.boardRoll}</td>
                    <td className="px-6 py-4 text-gray-800">{student.collageRoll}</td>
                    <td className="px-6 py-4 text-gray-800">{student.name}</td>
                    <td className="px-6 py-4 text-gray-800">{student.departmentId.name}</td>
                    <td className="px-6 py-4 text-gray-800">{student.semesterId.name}</td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => handleUpdateStudent(student)} className="px-4 py-1 bg-green-500 text-white rounded-lg mr-2 hover:bg-green-600 transition-all">
                        Edit
                      </button>
                      <button className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
    <CreateStudentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveStudent}
      />
      
    
    </>
  );
};

export default ManageStudent;
