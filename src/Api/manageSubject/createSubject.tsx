
import { CreateSubject } from '../../types/types';
import api from '../Api';

type ApiResponse = {
  success: boolean;
  message: string;
  data:[]
};

const createSubject = async (Subject : CreateSubject): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>('/api/subject/create-subject', Subject);
    return response.data; // return the response data with type safety
  } catch (error) {
    // Handle errors (e.g., network issues or server errors)
    console.error("Error create subject:", error);
    throw new Error("Error create subject:");
  }
};

export default createSubject;
