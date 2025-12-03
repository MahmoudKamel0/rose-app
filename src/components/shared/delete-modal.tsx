"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useDeleteAccount } from "@/hooks/profile/use-delete-account.hook";
import { useTranslations } from "next-intl";

/**
 * DeleteAccountModal component
 * 
 * Displays a modal dialog that asks the user to confirm account deletion.
 * Uses a custom hook `useDeleteAccount` to handle the deletion logic.
 * 
 */

export default function DeleteAccountModal({ open, onOpenChange }: any) {
    // Translation
    const t = useTranslations("delete-modal");

    // Hook for deleting the user account
  const { mutate: deleteAccount, isPending } = useDeleteAccount();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-zinc-800 dark:border-zinc-800 rounded-2xl p-8 max-w-md w-full text-center ">
        <DialogHeader>
          <DialogTitle className="mx-auto mb-6 w-24 h-24 rounded-full bg-[#2E2E3026] flex items-center justify-center border-8 border-gray-100">
            <Trash size={40} className="text-gray-700 dark:text-gray-500" />
          </DialogTitle>
        </DialogHeader>

        <p className="mt-2 text-xl font-semibold">
          {t("delete-account-title")}
        </p>
        <p className="text-base text-maroon-500 font-normal">
          {t("delete-account-warning")}
        </p>

        <div className="mt-4 flex justify-center gap-2">
          <Button
            variant="outline"
            className="text-base font-medium"
            onClick={() => onOpenChange(false)}
          >
            {t("cancel-delete")}
          </Button>

          <Button
            variant="default"
            disabled={isPending}
            className="bg-red-600 text-base font-medium"
            onClick={() => deleteAccount(undefined, { onSuccess: () => onOpenChange(false) })}
          >
            {isPending ? t("deleting") : t("confirm-delete")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
