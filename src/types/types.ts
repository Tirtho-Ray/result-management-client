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
  registration?: string;
  session: string;
  departmentId: string;
  semesterId: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
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


// for subject

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


export type CreateSubjectFormProps = {
  onSubmit: (subject: CreateSubject) => void;
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



// result

export interface RTDepartment {
  _id: string;
  name: string;
}

export interface RTSemester {
  _id: string;
  name: string;
}

export interface RTSubject {
  _id: string;
  name: string;
  code: string;
  semesterId: string;
}

export interface RTStudent {
  _id: string;
  name: string;
  session: string;
  boardRoll: string;
  registration: string;
  collageRoll: string;
  departmentId: RTDepartment;
  semesterId: RTSemester;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: any[]; // Replace with a proper result structure if necessary
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RTResult {
  subjectId: string;
  obtainedMarks: number;
}

export interface RTApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// for result
export type TSubject ={
  name: string;
  subCode: number;
  mark: number;
  credit:number;
  semesterId:{ _id: string; name: string };  
  departmentId:{ _id: string; name: string };  
}
