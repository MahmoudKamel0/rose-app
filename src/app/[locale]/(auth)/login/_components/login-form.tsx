"use client";

import { LoginFields, useLoginSchema } from "@lib/schemas/auth.schema";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from "@components/ui/form";
import { Button } from "@components/ui/button";
import { Link } from "@/i18n/navigation";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { useLogin } from "../_hooks/use-login";
import { useTranslations } from "next-intl";
import SubmissionFeedback from "@components/shared/submission-feedback";

export default function LoginForm() {
    // Translation
    const t = useTranslations("login");
  
    // Form
    const form = useForm<LoginFields>({
        resolver: zodResolver(useLoginSchema()),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    // Mutation
    const { login, isPending, error } = useLogin();

    // Function
    const onSubmit: SubmitHandler<LoginFields> = (values) => {
        login(values);
    }

    return <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className= "w-[25.5rem] flex flex-col border-y border-zinc-200 pt-6 pb-9 mb-5">
            {/* Email */}
            <FormField 
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mb-4">
                  <Label>{t("email")} </Label>
                  <FormControl>
                    <Input {...field} placeholder="user@example.com" className="w-full"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField 
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mb-2.5">
                  <Label>{t("password")} </Label>
                  <FormControl>
                    <Input {...field} placeholder="********" type="password" className="w-full"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Forgot Password */}
            <Link href= "/forgot-password" className="font-semibold text-sm text-maroon-700 mb-9 text-end dark:text-softpink-300">{t("forgotpss")}</Link>
            
            {/* Feedback */}
              <SubmissionFeedback>{error?.message}</SubmissionFeedback>

            {/* Submit */}
             <Button
                type="submit"
                variant="default"
                size="default"
                disabled={isPending || (form.formState.isSubmitted && !form.formState.isValid)}
                className="h-12 w-full bg-maroon-600 text-base font-medium text-white"
                >
                {t("login")} 
                </Button>
        </form>
    </Form>
}