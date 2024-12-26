import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Subject } from "../../../types/types";
import updateSubject from "../../../Api/manageSubject/updateSubject";
import api from "../../../Api/Api";

type Department = { _id: string; name: string };
type Semester = { _id: string; name: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

const UpdateSubject: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const initialSubject: Subject | undefined = location.state?.subject;

  const [formData, setFormData] = useState<Subject | null>(initialSubject || null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!initialSubject) {
      navigate("/admin/dashboard/subject");
    }
  }, [initialSubject, navigate]);

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
        [name]: name === "credit" || name === "mark" ? Number(value) : value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setLoading(true);
    try {
      const response = await updateSubject(id || "", formData);
      if (response.success) {
        navigate("/admin/dashboard/subject");
      } else {
        console.error("Failed to update subject:", response.message);
      }
    } catch (error) {
      console.error("Error updating subject:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Subject</h2>
        {formData && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subject Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Subject Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject Code</label>
              <input
                type="text"
                name="subCode"
                value={formData.subCode.toString()}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Credit */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Credit</label>
              <input
                type="number"
                name="credit"
                value={formData.credit}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Mark */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Mark</label>
              <input
                type=""
                name="mark"
                value={formData.mark}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <select
                name="departmentId"
                value={formData.departmentId._id}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: {
                      ...e.target,
                      value: departments.find((d) => d._id === e.target.value)?._id || "",
                    },
                  })
                }
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
                value={formData.semesterId._id}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: {
                      ...e.target,
                      value: semesters.find((s) => s._id === e.target.value)?._id || "",
                    },
                  })
                }
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
              {loading ? "Updating..." : "Update Subject"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateSubject;
