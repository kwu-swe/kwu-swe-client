type UserRole = "ROLE_STUDENT" | "ROLE_PROFESSOR" | "ROLE_ADMIN";
interface User {
  name: string;
  studentNumber: string;
  phoneNumber: string;
  role: UserRole;
}
interface CreateUser extends User {}
interface UpdateUser extends Partial<Pick<User, "phoneNumber">> {
  password?: string;
}
export type { User, UserRole, CreateUser, UpdateUser };
