import { Subject } from '../../types/types';
import api from '../Api';

type ApiResponse = {
  success: boolean;
  message: string;
  data: [];
};

const updateSubject = async (id: string, subject: Subject): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(`/api/subject/${id}`, subject);
    return response.data; // Return the response data with type safety
  } catch (error) {
    console.error("Error updating subject:", error);
    throw new Error("Error updating subject.");
  }
};

export default updateSubject;
