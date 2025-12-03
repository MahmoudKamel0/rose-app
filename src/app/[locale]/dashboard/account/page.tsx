import React from "react";
import ProfileForm from "../../../../components/shared/account-form";
import { getProfileData } from "@lib/actions/profile/profile.action";
import { getTranslations } from "next-intl/server";


export default async function AccountPage() {
  // Translation
  const t = await getTranslations("profile");

  // Fetching form data 
  const profile = await getProfileData();

  return (
    <div className="p-8 bg-zinc-50 min-h-screen mb-10 dark:bg-zinc-900">
          <h1 className="text-zinc-800 text-2xl font-semibold capitalize mb-9 dark:text-zinc-50">{t("account-settings")}</h1>
          <ProfileForm profile= {profile} showChangePassword= {true} />
    </div>
  )
}
