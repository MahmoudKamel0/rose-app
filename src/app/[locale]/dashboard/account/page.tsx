import React from "react";
import ProfileForm from "../_components/account-form";
import { getProfileData } from "@lib/actions/profile/profile.action";


export default async function page() {

  // Fetching form data 
  const profile = await getProfileData();
  return (
    <div className="container mx-auto flex gap-6 py-8 bg-zinc-50 min-h-screen">
        <div className="w-1/4">
            <h1>Placeholder...</h1>
        </div>
        <div className="w-3/4 p-4 mt-9 ">
            <h1 className="text-zinc-800 text-2xl font-semibold capitalize">Account Settings</h1>
            <ProfileForm profile= {profile} />
        </div>
    </div>
  )
}
