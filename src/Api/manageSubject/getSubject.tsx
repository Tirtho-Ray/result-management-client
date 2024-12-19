import { Subject } from '../../types/types';
import api from '../Api';

type SubjectApiResponse = {
    success: boolean;
    message: string;
    data: Subject[];
  };

const getSubject = async (): Promise<SubjectApiResponse> => {
  try {
    const response = await api.get<SubjectApiResponse>('/api/subject');
    return response.data;
  } catch (error) {

    console.error("Error get  book:", error);
    throw new Error("Error get  book:");
  }
};

export default getSubject;
