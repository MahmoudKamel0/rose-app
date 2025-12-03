"use client";

import { changePassword } from "@lib/actions/profile/change-password.action";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// Custom hook to handle the change password process
export function useChangePassword() {
  return useMutation({
    // Function that performs the password change request
    mutationFn: changePassword,
    // Triggered when the password is successfully changed
    onSuccess: () => {
      toast.success("Password updated successfully!");
    },
    // Triggered when the API call fails
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong!");
    },
  });
}