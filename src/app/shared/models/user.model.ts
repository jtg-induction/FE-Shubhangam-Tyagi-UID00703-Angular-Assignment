export class User {
  username: string;
  email: string;
  password: string;
  constructor(userName: string, email: string, password: string) {
    this.username = userName;
    this.email = email;
    this.password = password;
  }
}
