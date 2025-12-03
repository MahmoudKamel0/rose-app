import { useState } from "react";
import { Button } from "@/components/ui/button";
import DeleteAccountModal from "./delete-modal";
import { useTranslations } from "next-intl";

export default function DeleteAccountSection() {
  // Translation
  const t = useTranslations("profile");

  const [open, setOpen] = useState(false);

  return (
    <>
      <Button 
        variant="link" 
        className="mt-16 capitalize text-red-600 text-base p-0"
        onClick={() => setOpen(true)}
      >
        {t("delete-my-account")}
      </Button>

      <DeleteAccountModal open={open} onOpenChange={setOpen} />
    </>
  );
}
