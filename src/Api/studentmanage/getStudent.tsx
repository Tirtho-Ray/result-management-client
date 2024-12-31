import { Student } from '../../types/types';
import api from '../Api';

type StudentApiResponse = {
    success: boolean;
    message: string;
    data: Student;
  };

const getStudent = async (): Promise<StudentApiResponse> => {
  try {
    const response = await api.get<StudentApiResponse>('/api/students');
    return response.data;
  } catch (error) {

    console.error("Error get  book:", error);
    throw new Error("Error get  book:");
  }
};

export default getStudent;
