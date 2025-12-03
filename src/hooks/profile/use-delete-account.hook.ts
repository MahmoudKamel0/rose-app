"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

export function useDeleteAccount() {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/delete-account", {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete account");
      }

      return data;
    },

    onSuccess: () => {
      toast.success("Account deleted");
      signOut({ callbackUrl: "/login" });
    },

    onError: (err: any) => {
      toast.error(err.message || "Something went wrong");
    },
  });
}
