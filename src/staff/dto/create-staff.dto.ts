export interface CreateStaffDto {
  username: string;
  password: string;
  fullname?: string;
  email: string;
  phone?: string;
  address: string;
  avatar?: string;
}
