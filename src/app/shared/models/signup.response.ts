export interface UserDetails {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data: {
    user: UserDetails;
    token: string;
  };
  timestamp: string;
}
