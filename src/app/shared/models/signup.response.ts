import { User } from './user.model';

export interface SignupResponse {
  token: string;
  data: User;
}
