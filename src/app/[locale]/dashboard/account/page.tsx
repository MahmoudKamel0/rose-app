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
    <div className="bg-zinc-50 min-h-screen">
      <div className="container mx-auto flex gap-6 py-8 ">
        <div className="w-1/4">
          <h1>Placeholder...</h1>
        </div>
        <div className="w-3/4 p-4">
          <h1 className="text-zinc-800 text-2xl font-semibold capitalize mb-9">{t("account-settings")}</h1>
          <ProfileForm profile= {profile} showChangePassword= {true} />
        </div>
      </div>
    </div>
  )
}
