import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../../Api/Api";
import { StudentUpdate } from "../../../types/types";

type UpdateStudentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string | null; // The ID of the student to update
  onUpdate: (updatedStudent: StudentUpdate) => void;
};



type DropdownOption = { _id: string; name: string };

const UpdateStudentModal: React.FC<UpdateStudentModalProps> = ({
  isOpen,
  onClose,
  id,
  onUpdate,
}) => {
  const [student, setStudent] = useState<StudentUpdate | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [departments, setDepartments] = useState<DropdownOption[]>([]);
  const [semesters, setSemesters] = useState<DropdownOption[]>([]);

  // Fetch student data when modal opens
  useEffect(() => {
    if (isOpen && id) {
      const fetchStudent = async () => {
        setLoading(true);
        try {
          const response = await api.get<{ success: boolean; data: StudentUpdate }>(
            `/api/students/${id}`
          );
          console.log(response.data)
          if (response.data.success) {
            setStudent(response.data.data); // Pre-fill form fields
          } else {
            Swal.fire("Error", "Failed to fetch student details", "error");
          }
        } catch (error) {
          console.error("Error fetching student data:", error);
          Swal.fire("Error", "Failed to fetch student details", "error");
        } finally {
          setLoading(false);
        }
      };

      fetchStudent();
    }
  }, [isOpen, id]);

  // Fetch departments and semesters for dropdowns
  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        const [departmentResponse, semesterResponse] = await Promise.all([
          api.get<{ success: boolean; data: DropdownOption[] }>("/api/departments"),
          api.get<{ success: boolean; data: DropdownOption[] }>("/api/semesters"),
        ]);

        if (departmentResponse.data.success && semesterResponse.data.success) {
          setDepartments(departmentResponse.data.data);
          setSemesters(semesterResponse.data.data);
        } else {
          Swal.fire("Error", "Failed to fetch metadata", "error");
        }
      } catch (error) {
        console.error("Error fetching metadata:", error);
        Swal.fire("Error", "Failed to fetch metadata", "error");
      }
    };

    fetchMetaData();
  }, []);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setStudent((prevStudent) =>
      prevStudent ? { ...prevStudent, [name]: value } : null
    );
  };

  // Handle update action
  const handleUpdate = async () => {
    if (!student) return;
    setLoading(true);
    try {
      const response = await api.put<{ success: boolean; data: StudentUpdate }>(
        `/api/students/${id}`,
        student
      );

      if (response.data.success) {
        Swal.fire("Success", "Student updated successfully", "success");
        onUpdate(response.data.data); // Pass updated student data to parent
        onClose(); // Close modal
      } else {
        Swal.fire("Error", "Failed to update student", "error");
      }
    } catch (error) {
      console.error("Error updating student:", error);
      Swal.fire("Error", "Failed to update student", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Update Student</h2>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : student ? (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 border rounded-lg"
                value={student.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Board Roll</label>
              <input
                type="text"
                name="boardRoll"
                className="w-full px-4 py-2 border rounded-lg"
                value={student.boardRoll}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Collage Roll</label>
              <input
                type="text"
                name="collageRoll"
                className="w-full px-4 py-2 border rounded-lg"
                value={student.collageRoll}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Department</label>
              <select
                name="departmentId"
                className="w-full px-4 py-2 border rounded-lg"
                value={student.departmentId}
                onChange={handleInputChange}
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Semester</label>
              <select
                name="semesterId"
                className="w-full px-4 py-2 border rounded-lg"
                value={student.semesterId}
                onChange={handleInputChange}
              >
                <option value="">Select Semester</option>
                {semesters.map((semester) => (
                  <option key={semester._id} value={semester._id}>
                    {semester.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleUpdate}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
              >
                Update
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">No student data available</p>
        )}
      </div>
    </div>
  );
};

export default UpdateStudentModal;
