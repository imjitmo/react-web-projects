export interface Users {
  email: string;
  password: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  userType?: string;
}

export interface UserLogs {
  userId: string;
  userName: string;
  userEmail: string;
  userType: string;
  action: string;
}
