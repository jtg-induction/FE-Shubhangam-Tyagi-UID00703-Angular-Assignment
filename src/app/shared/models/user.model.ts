export interface UserDetails {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  user: UserDetails;
  token: string;
}
