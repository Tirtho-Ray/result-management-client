import { useEffect, useState } from "react";
import updateSubject from "../../../Api/manageSubject/update";
import { Subject, SubjectApiResponse } from "../../../types/types";
import api from "../../../Api/Api";

interface UpdateSubjectProps {
    subject: Subject;
    onSubmit: (updatedSubject: Partial<Subject>) => void;
  }
  
  const UpdateSubject: React.FC<UpdateSubjectProps> = ({ subject, onSubmit }) => {
    const [formData, setFormData] = useState<Partial<Subject>>(subject);
  
    const [departments, setDepartments] = useState<{ _id: string; name: string }[]>([]);
    const [semesters, setSemesters] = useState<{ _id: string; name: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
  
    useEffect(() => {
      const fetchDepartments = async () => {
        try {
          const response = await api.get<SubjectApiResponse>('/api/departments');
          if (response.data.success) {
            setDepartments(response.data.data);
          }
        } catch (error) {
          console.error('Error fetching departments:', error);
        }
      };
  
      const fetchSemesters = async () => {
        try {
          const response = await api.get<SubjectApiResponse>('/api/semesters');
          if (response.data.success) {
            setSemesters(response.data.data);
          }
        } catch (error) {
          console.error('Error fetching semesters:', error);
        }
      };
  
      fetchDepartments();
      fetchSemesters();
    }, []);
  
    // Handle input changes for the form fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: name === 'subCode' || name === 'credit' || name === 'mark' ? +value : value,
      }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
          const response = await updateSubject(subject._id, formData);  // Pass subject._id to the update API
          if (response.success) {
            console.log('Subject updated successfully:', response.data);
            onSubmit(formData);  // Optionally, notify the parent component
          } else {
            console.error('Failed to update subject:', response.message);
          }
        } catch (error) {
          console.error('Error updating subject:', error);
        } finally {
          setLoading(false);
        }
      };
      
  
    return (
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Subject Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
  
        <div className="mb-4">
          <label className="block text-sm font-medium">Subject Code</label>
          <input
            type="text"
            name="subCode"
            value={formData.subCode || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
  
        <div className="mb-4">
          <label className="block text-sm font-medium">Credit</label>
          <input
            type="number"
            name="credit"
            value={formData.credit || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
  
        <div className="mb-4">
          <label className="block text-sm font-medium">Mark</label>
          <input
            type="number"
            name="mark"
            value={formData.mark || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
  
        {/* Department Select */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Department</label>
          <select
            name="departmentId"
            value={formData.departmentId || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
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
            value={formData.semesterId || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select Semester</option>
            {semesters.map((semester) => (
              <option key={semester._id} value={semester._id}>
                {semester.name}
              </option>
            ))}
          </select>
        </div>
  
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          disabled={loading} // Disable the button while loading
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
    );
  };
  
  export default UpdateSubject;
  