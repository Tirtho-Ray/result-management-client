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


