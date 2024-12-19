import { UpdateSubject } from '../../types/types';
import api from '../Api';

type ApiResponse = {
  success: boolean;
  message: string;
  data: [];
};

const updateSubject = async (id: string, subject: UpdateSubject): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(`/api/subject/${id}`, subject);  // Correct URL with dynamic `id`
    return response.data;
  } catch (error) {
    console.error("Error updating subject:", error);
    throw new Error("Error updating subject.");
  }
};

export default updateSubject;
