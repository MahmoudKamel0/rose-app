"use client";

import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRegister } from "../_hooks/use-register";
import { PhoneInput } from "@components/ui/phone-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ErrorMessage } from "@components/shared/error-message";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";
import { RegisterInput, useRegisterSchema } from "@lib/schemas/auth/register.schema";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    // Hooks
    const router = useRouter();

    // Translations
    const t = useTranslations("register");

    //Hook
    const registerSchema = useRegisterSchema();

    // Form state and validation
    const form = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
            gender: "male",
        },
    });

    // Mutation hook for registration
    const registerMutation = useRegister();

    // Handle form submission
    const onSubmit = (data: RegisterInput) => {
        // Execute the registration mutation
        registerMutation.mutate(data, {
            // Success callbacks
            onSuccess: () => {
                toast.success(t("account-created-successfully"));
                router.push("/login");
            },
            // Error callback
            onError: (err) => {
                console.error("Register error:", err);
            },
        });
    };

    return (
        <div className="flex w-full flex-col justify-center gap-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="border-y border-zinc-200 py-6">
                    {/* First + Last Name */}
                    <div className="grid grid-cols-2 gap-5">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("firstName")}</FormLabel>
                                    <FormControl>
                                        <Input className="w-full" placeholder="Jonathan" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("lastName")}</FormLabel>
                                    <FormControl>
                                        <Input className="w-full" placeholder="Adrian" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("email")}</FormLabel>
                                <FormControl>
                                    <Input className="w-full" type="email" placeholder="user@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Phone */}
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("phone")}</FormLabel>
                                <FormControl className="w-full">
                                    <PhoneInput
                                        className="w-full"
                                        placeholder="1012345678"
                                        {...field}
                                        defaultCountry="EG"
                                        countryCallingCodeEditable={false}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Gender */}
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("gender")}</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl className="w-full">
                                        <SelectTrigger>
                                            <SelectValue placeholder={t("selectGender")} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="male">{t("male")}</SelectItem>
                                        <SelectItem value="female">{t("female")}</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Password */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("password")}</FormLabel>
                                <FormControl>
                                    <Input className="w-full" type="password" placeholder="Password@12345" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Confirm Password */}
                    <FormField
                        control={form.control}
                        name="rePassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("rePassword")}</FormLabel>
                                <FormControl>
                                    <Input className="w-full" type="password" placeholder="********" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Error Message */}
                    {registerMutation.isError && (
                        <ErrorMessage message={registerMutation.error instanceof Error ? registerMutation.error.message : t("error")} />
                    )}

                    {/* Submit */}
                    <Button className="bg-maroon-600 mt-5 h-12 w-full text-white" type="submit" disabled={registerMutation.isPending}>
                        {registerMutation.isPending ? t("loading") : t("createAccount")}
                    </Button>

                    {/* Link to Login */}
                    <div className="mt-5 border-zinc-200 pt-5 text-center text-sm">
                        <span className="text-sm font-medium text-zinc-800 dark:text-zinc-50">{t("already")} </span>
                        <Link href="/login" className="text-maroon-700 dark:text-softpink-300 font-bold underline">
                            {t("login")}
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    );
}
