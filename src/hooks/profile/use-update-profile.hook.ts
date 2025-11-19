"use client";

import { ProfileFormValues } from "@lib/types/profile/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: ProfileFormValues) => {
      const res = await fetch("/api/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update profile");
      }

      return res.json();
    },

    onSuccess: (data) => {
      toast.success("Profile updated successfully");

      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
}
