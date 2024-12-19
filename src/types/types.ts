export interface LoginFormData {
    email: string;
    password: string;
  }
  
 export interface ApiResponse {
    success: boolean;
    message: string;
  }

  // types.ts or models.ts (or whatever file you prefer)

export interface Student {
  name: string;
  boardRoll: string;
  registration: string;
  session: string;
  departmentId: string;
  semesterId: string;
  email?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
}
export type CreateStudentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (student: {
    name: string;
    boardRoll: string;
    registration: string;
    session: string;
    departmentId: string;
    semesterId: string;
    email?: string;
    phone?: string;
    address?: string;
    dateOfBirth?: string;
  }) => void;
};

export type StudentUpdate = {
  _id: string;
  name: string;
  boardRoll: string;
  collageRoll: string;
  departmentId: string;
  semesterId: string;
  email: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
};


export type Subject = {
  _id: string;
  name: string;
  subCode: number;
  mark: number;
  credit: number;
  semesterId: {
      _id: string;
      name: string;
  };
  departmentId: {
      _id: string;
      name: string;
  };
};

export type Department = {
  _id: string;
  name: string;
};

export type Semester = {
  _id: string;
  name: string;
};

export type CreateSubject = {
  _id?: string;
  name: string;
  subCode: number;
  mark: number;
  credit: number;
  semesterId: string
  departmentId: string;
};

export type UpdateSubject = {
  _id?: string;
  name?: string;
  subCode?: number;
  mark?: number;
  credit?: number;
  semesterId?: string
  departmentId?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SubjectApiResponse<T = any> = {
  success: boolean;
  message: string;
  data: T;
};



