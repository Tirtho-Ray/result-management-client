import { Student } from '../../types/types';
import api from '../Api';

type ApiResponse = {
  success: boolean;
  message: string;
  data: [];
};

const updateStudent = async (id: string, student: Student): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(`/api/student/${id}`, student);
    return response.data; // Return the response data with type safety
  } catch (error) {
    console.error("Error updating subject:", error);
    throw new Error("Error updating subject.");
  }
};

export default updateStudent;
