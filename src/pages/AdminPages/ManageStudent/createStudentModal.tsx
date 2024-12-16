/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import api from "../../../Api/Api";
import saveStudent from "../../../Api/studentmanage/saveStudent";
import { CreateStudentModalProps } from "../../../types/types";



interface ApiResponse {
  success: boolean;
  message: string;
  data: [];
}

const CreateStudentModal: React.FC<CreateStudentModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [student, setStudent] = useState({
    name: "",
    boardRoll: "",
    registration: "",
    session: "",
    departmentId: "",
    semesterId: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
  });

  // States to store departments and semesters
  const [departments, setDepartments] = useState<{ _id: string; name: string }[]>(
    []
  );
  const [semesters, setSemesters] = useState<{ _id: string; name: string }[]>([]);

  // Fetch departments from the API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get<ApiResponse>("/api/departments");
        if (response.data.success) {
          setDepartments(response.data.data);
        } else {
          Swal.fire("Error", "Failed to fetch departments", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Failed to fetch departments", "error");
      }
    };

    fetchDepartments();
  }, []);

  // Fetch semesters from the API
  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await api.get<ApiResponse>("/api/semesters");
        if (response.data.success) {
          setSemesters(response.data.data);
        } else {
          Swal.fire("Error", "Failed to fetch semesters", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Failed to fetch semesters", "error");
      }
    };

    fetchSemesters();
  }, []);

  // Handle input change for text inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  // Handle select change for department and semester
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  // Handle save button click
  const handleSave = async () => {
    try {
      const response = await saveStudent(student);

      if (response.success) {
        Swal.fire({
          title: "Success!",
          text: response.message,
          icon: "success",
          confirmButtonText: "Okay",
        });

        // Optionally call onSave callback (if needed)
        onSave(student);

        // Reset the form and close the modal
        setStudent({
          name: "",
          boardRoll: "",
          registration: "",
          session: "",
          departmentId: "",
          semesterId: "",
          email: "",
          phone: "",
          address: "",
          dateOfBirth: "",
        });
        onClose();
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "There was an issue saving the student data.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Create New Student</h2>

        {/* Student Form */}
        {/* name */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 border rounded-lg"
            value={student.name}
            onChange={handleInputChange}
            required
          />
        </div>
{/* boardroll */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Board Roll</label>
          <input
            type="text"
            name="boardRoll"
            className="w-full px-4 py-2 border rounded-lg"
            value={student.boardRoll}
            onChange={handleInputChange}
            required
          />
        </div>
            {/* registration */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Registration</label>
          <input
            type="text"
            name="registration"
            className="w-full px-4 py-2 border rounded-lg"
            value={student.registration}
            onChange={handleInputChange}
            required
          />
        </div>
            {/* session */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Session</label>
          <input
            type="text"
            name="session"
            className="w-full px-4 py-2 border rounded-lg"
            value={student.session}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Department Select */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Department</label>
          <select
            name="departmentId"
            className="w-full px-4 py-2 border rounded-lg"
            value={student.departmentId}
            onChange={handleSelectChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>

        {/* Semester Select */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Semester</label>
          <select
            name="semesterId"
            className="w-full px-4 py-2 border rounded-lg"
            value={student.semesterId}
            onChange={handleSelectChange}
            required
          >
            <option value="">Select Semester</option>
            {semesters.map((semester) => (
              <option key={semester._id} value={semester._id}>
                {semester.name}
              </option>
            ))}
          </select>
        </div>

        {/* [phone] */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="123456789"
            className="w-full px-4 py-2 border rounded-lg"
            value={student.phone}
            onChange={handleInputChange}
          />
        </div>

        {/* [email] */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border rounded-lg"
            value={student.email}
            onChange={handleInputChange}
          />
        </div>
        {/* address */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            name="address"
            className="w-full px-4 py-2 border rounded-lg"
            value={student.address}
            onChange={handleInputChange}
          />
        </div>
        {/* date */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Date</label>
          <input
            type="text"
            name="dateOfBirth"
            className="w-full px-4 py-2 border rounded-lg"
            value={student.dateOfBirth}
            onChange={handleInputChange}
          />
        </div>

        {/* Optional fields */}
        {/* You can add Email, Phone, Address, Date of Birth inputs similarly */}

        <div className="flex justify-between">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateStudentModal;
