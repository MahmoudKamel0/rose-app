"use client";

import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";
import { RegisterInput, registerSchema } from "@/lib/schemes/auth.schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRegister } from "../_hooks/use-register";
import { PhoneInput } from "@components/ui/phone-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function RegisterForm() {
    const router = useRouter();
    const t = useTranslations();

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

    const registerMutation = useRegister();

    const onSubmit = (data: RegisterInput) => {
        const payload = { ...data };
        registerMutation.mutate(payload, {
            onSuccess: () => {
                router.push("/login");
            },
            onError: (err) => {
                console.error("Register error:", err);
            },
        });
    };

    return (
        <div className="flex flex-col justify-center gap-10 font-sans">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* First + Last Name */}
                    <div className="grid grid-cols-2 gap-5">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("firstName")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Jonathan" {...field} />
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
                                        <Input placeholder="Adrian" {...field} />
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
                                    <Input type="email" placeholder="user@example.com" {...field} />
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
                                <FormControl>
                                    <PhoneInput
                                        placeholder="1012345678"
                                        {...field}
                                        defaultCountry="EG"
                                        international
                                        countryCallingCodeEditable={false}
                                        className="w-full"
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
                                    <FormControl>
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
                                    <Input type="password" placeholder="Password@12345" {...field} />
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
                                    <Input type="password" placeholder="********" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Error Message */}
                    {registerMutation.isError && (
                        <div className="relative h-fit w-full rounded-md border border-red-300 bg-red-50 p-3 text-red-600">
                            <XCircle className="absolute top-1/2 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 bg-white text-red-600" />
                            <p className="text-center text-sm">
                                {registerMutation.error instanceof Error ? registerMutation.error.message : t("error")}
                            </p>
                        </div>
                    )}

                    {/* Submit */}
                    <Button className="mt-5 h-12 w-full rounded-none" type="submit" disabled={registerMutation.isPending}>
                        {registerMutation.isPending ? t("loading") : t("createAccount")}
                    </Button>

                    {/* Link to Login */}
                    <div className="mt-10 text-center text-sm">
                        <span className="text-sm font-medium text-zinc-800">{t("already")} </span>
                        <Link href="/login" className="text-maroon-700 font-bold underline">
                            {t("login")}
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    );
}
