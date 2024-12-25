import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Student } from "../../../types/types";
import api from "../../../Api/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Department = { _id: string; name: string };
type Semester = { _id: string; name: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

const UpdateStudent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const initialStudent: Student | undefined = location.state?.student;

  const [formData, setFormData] = useState<Student | null>(initialStudent || null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!initialStudent) {
      navigate("/admin/dashboard/student");
    }
  }, [initialStudent, navigate]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [deptResponse, semResponse] = await Promise.all([
          api.get<ApiResponse<Department[]>>("/api/departments"),
          api.get<ApiResponse<Semester[]>>("/api/semesters"),
        ]);

        if (deptResponse.data.success) setDepartments(deptResponse.data.data);
        if (semResponse.data.success) setSemesters(semResponse.data.data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (formData) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setLoading(true);
    try {
      const response = await api.put<ApiResponse>(
        `/api/students/${id}`,
        formData
      );

      if (response.data.success) {
        toast.success("Student updated successfully!");
        navigate("/admin/dashboard/student");
      } else {
        toast.error(`Failed to update student: ${response.data.message}`);
      }
    } catch (error) {
      toast.error("Error updating student.");
      console.error("Error updating student:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Student</h2>
        {formData && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Board Roll */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Board Roll</label>
              <input
                type="text"
                name="boardRoll"
                value={formData.boardRoll}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Registration */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Registration</label>
              <input
                type="text"
                name="registration"
                value={formData.registration}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Session */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Session</label>
              <input
                type="text"
                name="session"
                value={formData.session}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <select
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Semester */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Semester</label>
              <select
                name="semesterId"
                value={formData.semesterId}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Semester</option>
                {semesters.map((semester) => (
                  <option key={semester._id} value={semester._id}>
                    {semester.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full px-4 py-2 text-white font-semibold rounded-lg ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Student"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateStudent;
