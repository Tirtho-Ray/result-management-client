import { Student } from '../../types/types';
import api from '../Api';

type ApiResponse = {
  success: boolean;
  message: string;
  data: any;
};

const saveStudent = async (student: Student): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>('/api/students/create-student', student);
    return response.data; // return the response data with type safety
  } catch (error) {
    // Handle errors (e.g., network issues or server errors)
    console.error("Error saving student:", error);
    throw new Error("Error saving student");
  }
};

export default saveStudent;
