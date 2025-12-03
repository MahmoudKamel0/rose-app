"use server";
import { ProfileApiResponse, ProfileFormValues } from '@lib/types/profile/profile';
import { getDecodeToken } from '@lib/utils/get-decode-token';

/**
 * Fetches the current user's profile data from the backend.
 **/
export async function getProfileData(): Promise<ProfileFormValues> {
    // Get the decoded JWT token from cookies
  const token = await getDecodeToken();

    // Fetch profile data from the API with authentication
  const res = await fetch(`${process.env.BASE_URL}auth/profile-data`, {
        method: "GET",
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
      cache: 'no-store', 
    },
    
  });
  // Handle errors from the API
  if (!res.ok) throw new Error('Failed to fetch profile');

  const data: ProfileApiResponse = await res.json();
  
    // Return the user object (profile data)
  return data.user; 
}