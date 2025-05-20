export interface Users {
  company?: string;
  email: string;
  password: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  userType?: string;
  section?: string;
}

export interface UserLogs {
  userId: string;
  userName: string;
  userEmail: string;
  userType: string;
  action: string;
}

export interface UserImageUpdateProps {
  id?: string;
  photo: File | string;
}

export interface UserSignatureUpdateProps {
  id?: string;
  signature: File | string;
}
