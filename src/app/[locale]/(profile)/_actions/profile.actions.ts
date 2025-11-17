"use server";
import { getDecodeToken } from '@lib/utils/get-decode-token';
import { ProfileFormValues, ProfileApiResponse } from '../types/profile.type';

export async function getProfileData(): Promise<ProfileFormValues> {
  const token = await getDecodeToken();
  const res = await fetch(`${process.env.BASE_URL}auth/profile-data`, {
        method: "GET",
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
      cache: 'no-store', 
    },
    
  });

  if (!res.ok) throw new Error('Failed to fetch profile');

  const data: ProfileApiResponse = await res.json();
  return data.user; 
}


export async function updateProfile(data: Partial<ProfileFormValues>): Promise<ProfileFormValues> {
  const token = await getDecodeToken();

  const res = await fetch(`${process.env.BASE_URL}auth/editProfile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Failed to update profile");
  }

  const updatedData: ProfileApiResponse = await res.json();
  return updatedData.user;
}


// export async function updateProfile(data: ProfileFormValues) {
// const token = await getDecodeToken() 
//   const res = await fetch(`${process.env.BASE_URL}auth/editProfile`, {
//     method: "PUT",
//     headers: {
//         ...JSON_HEADER,
//         Authorization: `Bearer ${token?.accessToken}`,
//     },
//     body: JSON.stringify(data),
//   });

//   if (!res.ok) throw new Error("Failed to update profile");
//   return res.json();
// }

// export async function uploadProfilePhoto(file: File) {
//   const token = await getDecodeToken() ;
//   const formData = new FormData();
//   formData.append("photo", file);

//   const res = await fetch(`${process.env.BASE_URL}auth/upload-photo`, {
//     method: "PUT",
//     headers: {  
//       Authorization: `Bearer ${token?.accessToken}`,
//     },
//     body: formData,
//   });

//   if (!res.ok) throw new Error("Failed to upload photo");

//   return res.json();
// }

// export async function deleteAccount() {
//   const token = await getDecodeToken() ;

//   const res = await fetch(`${process.env.BASE_URL}auth/deleteMe`, {
//     method: "DELETE",
//     headers: {  
//       ...JSON_HEADER,
//       Authorization: `Bearer ${token?.accessToken}`,
//     },
//   });

//   if (!res.ok) throw new Error("Failed to delete account");

//   return res.json();
// }
