"use client";

import { useQuery } from '@tanstack/react-query';
import { ProfileApiResponse } from '../types/profile.type';

export const useProfile = () => {
  return useQuery<ProfileApiResponse>({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await fetch('/api/profile-data', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch profile');
      return res.json();
    },
  });
};
