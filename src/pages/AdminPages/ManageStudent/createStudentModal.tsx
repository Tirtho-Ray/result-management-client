/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
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
  const [departments, setDepartments] = useState<{ _id: string; name: string }[]>([]);
  const [semesters, setSemesters] = useState<{ _id: string; name: string }[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
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
    },
  });

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      const response = await saveStudent(data);

      if (response.success) {
        Swal.fire({
          title: "Success!",
          text: response.message,
          icon: "success",
          confirmButtonText: "Okay",
        });

        onSave(response.data);
        reset();
        onClose();
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data?.err?.issues) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error.response.data.err.issues.forEach((issue: any) => {
          setError(issue.path, { message: issue.message });
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "There was an issue saving the student data.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Create New Student</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Name*</label>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Name  is required",
                minLength: { value: 0, message: "Name Roll must be exactly 0 characters" },
                maxLength: { value: 50, message: "Name Roll must be exactly 50 characters" },
              }}
              render={({ field }) => (
                <input
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  {...field}
                />
              )}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Board Roll */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Board Roll*</label>
            <Controller
              name="boardRoll"
              control={control}
              rules={{
                required: "Board Roll is required",
                minLength: { value: 5, message: "Board Roll must be exactly 5 characters" },
                maxLength: { value: 7, message: "Board Roll must be exactly 7 characters" },
              }}
              render={({ field }) => (
                <input
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.boardRoll ? "border-red-500" : "border-gray-300"
                  }`}
                  {...field}
                />
              )}
            />
            {errors.boardRoll && (
              <p className="text-red-500 text-sm">{errors.boardRoll.message}</p>
            )}
          </div>

          {/* Registration */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Registration*</label>
            <Controller
              name="registration"
              control={control}
              rules={{
                required: "Registration Roll is required",
                minLength: { value: 10, message: "registration Roll must be exactly 10 characters" },
                maxLength: { value: 10, message: "registration Roll must be exactly 10 characters" },
              }}
              render={({ field }) => (
                <input
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.registration ? "border-red-500" : "border-gray-300"
                  }`}
                  {...field}
                />
              )}
            />
            {errors.registration && (
              <p className="text-red-500 text-sm">{errors.registration.message}</p>
            )}
          </div>

          {/* Session */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Session</label>
            <Controller
              name="session"
              control={control}
              rules={{ required: "session Roll is required" }}

              render={({ field }) => (
                <select
                  className="w-full px-4 py-2 border rounded-lg"
                  {...field}
                >
                  <option value="">Select Session</option>
                  <option value="20-22">20-22</option>
                  <option value="21-22">21-22</option>
                  <option value="22-23">22-23</option>
                  <option value="23-24">23-24</option>
                  <option value="24-25">24-25</option>
                  <option value="25-26">25-26</option>
                  <option value="26-27">26-27</option>
                </select>
              )}
            />
          </div>

          {/* Department */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Department*</label>
            <Controller
              name="departmentId"
              control={control}
              rules={{ required: "Department is required" }}
              render={({ field }) => (
                <select
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.departmentId ? "border-red-500" : "border-gray-300"
                  }`}
                  {...field}
                >
                  <option value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department._id} value={department._id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.departmentId && (
              <p className="text-red-500 text-sm">{errors.departmentId.message}</p>
            )}
          </div>

          {/* Semester */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Semester*</label>
            <Controller
              name="semesterId"
              control={control}
              rules={{ required: "Semester is required" }}
              render={({ field }) => (
                <select
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.semesterId ? "border-red-500" : "border-gray-300"
                  }`}
                  {...field}
                >
                  <option value="">Select Semester</option>
                  {semesters.map((semester) => (
                    <option key={semester._id} value={semester._id}>
                      {semester.name}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.semesterId && (
              <p className="text-red-500 text-sm">{errors.semesterId.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Phone</label>
            <Controller
              name="phone"
              control={control}
              rules={{
                minLength: { value: 11, message: "phone Roll must be exactly 11 characters" },
                maxLength: { value: 11, message: "phone Roll must be exactly 11 characters" },
              }}
              render={({ field }) => (
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="123456789"
                  {...field}
                />
              )}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg"
                  {...field}
                />
              )}
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Address</label>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  {...field}
                />
              )}
            />
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Date of Birth</label>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  {...field}
                />
              )}
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStudentModal;
