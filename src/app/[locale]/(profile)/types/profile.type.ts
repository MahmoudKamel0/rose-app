
export type ProfileFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  photo: string;
};

export type ProfileApiResponse = {
  message: string;
  user: ProfileFormValues;
};