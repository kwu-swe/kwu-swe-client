type UserRole = "ROLE_STUDENT" | "ROLE_PROFESSOR" | "ROLE_ADMIN";
interface User {
  name: string;
  code: string;
  phoneNumber: string;
  role: UserRole;
  createdAt: Date;
}
interface UserCreate extends Omit<User, "role"> {
  password: string;
}
interface UserUpdate extends Partial<UserCreate> { }
export type { User, UserRole, UserCreate, UserUpdate };
