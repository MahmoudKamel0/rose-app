"use client";

import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { ProfileFormValues } from "@lib/types/profile/profile";
import { useUpdateProfile } from "@/hooks/profile/use-update-profile.hook";
import { getProfileData } from "@lib/actions/profile/profile.action";
import AvatarUpload from "@components/shared/avatar-upload";
import DeleteAccountSection from "@components/shared/delete-account-btn";
import Link from "next/link";

interface ProfileFormProps {
  profile: ProfileFormValues;
}

/**
 * ProfileForm Component
 * 
 * Displays a form to view and update user's profile information.
 * Includes fields for avatar, first name, last name, email, phone, and gender.
 * Also provides buttons for deleting the account and changing the password.
 */

export default function ProfileForm({ profile }: ProfileFormProps) {
    // Initialize react-hook-form with default values from the profile
  const form = useForm<ProfileFormValues>({
    defaultValues: profile,
  });

  // Hook for updating the profile
    const updateProfile = useUpdateProfile();

    //Handle form submission
function onSubmit(values: ProfileFormValues) {
  updateProfile.mutate(values, {
    onSuccess: (data) => {
      // Reset form with updated user data after successful update
      form.reset(data.user);
    },
  });
}

  return (
    <FormProvider {...form}>
      <form className="space-y-6 bg-white rounded-2xl p-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="photo"
          control={form.control}
          render={({ field }) => (
            <AvatarUpload value={field.value} onChange={(url) => field.onChange(url)} />
          )}
        />
        <div className="flex gap-4 justify-between">
          {/* first name */}
          <div className="flex-1">
          <FormField name="firstName" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          </div>

          {/* last name */}
         <div className="flex-1">
          <FormField name="lastName" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        </div>

        {/* email */}
        <FormField name="email" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
  {/* phone */}
        <FormField name="phone" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* gender */}
        <FormField name="gender" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel className="text-zinc-400">Gender</FormLabel>
            <FormControl>
              <Input className="text-zinc-400" {...field} disabled readOnly />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Form footer (buttons) */}
        <div className="flex justify-between">
          <div className="flex-1">
        <DeleteAccountSection />
        <Button variant="link" className="mt-16 capitalize text-base p-0">
          <Link href="change-password">Change Password</Link>
        </Button>
        </div>

          <div className="flex-1 flex justify-end">
            <Button type="submit" className="mt-16 capitalize text-base">Save Changes</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
