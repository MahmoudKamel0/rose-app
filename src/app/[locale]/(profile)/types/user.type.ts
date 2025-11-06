// src/types/user.ts
export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string | null;
  gender?: string | null;
  phone?: string | null;
  photo?: string | null;
  role?: string | null;
  wishlist?: any[];  
  addresses?: any[];  
  createdAt?: string;
};

export type EditProfileResponse = {
  message: "success" | string;
  user: User;
};
