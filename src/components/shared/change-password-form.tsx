// src/components/dashboard/forms/ChangePasswordForm.tsx
"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Input } from "@components/ui/input";
import { toast } from "sonner";
import { useChangePassword } from "@/hooks/profile/use-change-password.hook";
import { FormInput } from "@lib/types/profile/change-password";
import { changePassword } from "@lib/actions/profile/change-password.action";
import { ChangePasswordFormSchema, ChangePasswordValues } from "@lib/schemas/profile/change-password.schema";
import { Button } from "@components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "@i18n/navigation";

export default function ChangePasswordForm() {
  // Translation
  const t = useTranslations("change-password");

  // Hooks
  const { mutate, isPending } = useChangePassword();

  // Routing
  const router = useRouter();

   // Form hook
    const form = useForm<ChangePasswordValues>({
        resolver: zodResolver(ChangePasswordFormSchema),
        mode: "onSubmit",

        defaultValues: {
            password: "",
            newPassword: "",
            confirmNewPassword: "",
        },
    });

    // Function 
    const onSubmit = async (data: FormInput<typeof ChangePasswordFormSchema>) => { 
    try {
      await changePassword({
        password: data.password,
        newPassword: data.newPassword,
        });
      // Show success toast
      toast.success(t("password-updated-successfully"));
      form.reset();

      // 1- Logout
      await signOut({ redirect: false }); 

      // 2- Redirect to homepage
      router.push("/login");

    } catch (err) {
      // Show error toast
      const error = err as Error;
      toast.error(error.message || t("failed-update-password"));

    }
  };

return (
  <div>
    {/* Password form */}
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values))}
        className="space-y-6"
      >
        {/* Current Password */}
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="border-b-1 py-6 dark:border-b-zinc-800">
              <FormLabel className="text-base font-medium">{t("old-password")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="••••••••"
                  aria-invalid={!!form.formState.errors.password}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* New Password */}
        <FormField
          name="newPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">{t("new-password")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="••••••••"
                  aria-invalid={!!form.formState.errors.newPassword}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm New Password */}
        <FormField
          name="confirmNewPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">{t("confirm-new-password")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="••••••••"
                  aria-invalid={!!form.formState.errors.confirmNewPassword}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="w-full text-right">
          <Button
            type="submit"
            className="font-medium text-base text-white mt-12"
            disabled={isPending}
          >
            {isPending ? t("updating") : t("change-password")}   
          </Button>
        </div>
      </form>
    </FormProvider>
  </div>
);
}

