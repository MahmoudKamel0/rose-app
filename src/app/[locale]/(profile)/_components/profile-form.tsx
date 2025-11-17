'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { ProfileFormValues } from '../types/profile.type';
import AvatarUpload from '@components/shared/avatar-upload';

interface ProfileFormProps {
  profile: ProfileFormValues;
}

export default function ProfileForm({ profile }: ProfileFormProps) {
  const form = useForm<ProfileFormValues>({
    defaultValues: profile,
  });

  return (
    <FormProvider {...form}>
      <form className="space-y-6">
<FormField
  control={form.control}
  name="photo"
  render={({ field }) => (
    <AvatarUpload
      value={field.value}         
      onChange={(url) => field.onChange(url)} 
    />
  )}
/>


        <FormField
          name="firstName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="lastName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="gender"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Input {...field} disabled readOnly/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-8">
          Save Changes
        </Button>
      </form>
    </FormProvider>
  );
}
