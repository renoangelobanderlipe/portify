export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix?: string;
  email: string;
  avatar?: string;
  contact_number?: string;
  headline?: string;
  bio?: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
  roles: Role[];
}

export interface UserPayload {
  user: User;
  token: string;
}
