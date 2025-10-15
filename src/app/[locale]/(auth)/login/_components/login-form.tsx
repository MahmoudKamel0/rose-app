"use client";

import { loginSchema, LoginValues } from "@lib/schemas/auth.schema";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from "@components/ui/form";
import { Button } from "@components/ui/button";
import Link from "next/link";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { useLogin } from "../_hooks/use-login";

export default function LoginForm() {
    // login form
    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    //Mutation
    const { login, isPending, error } = useLogin();

// const onSubmit: SubmitHandler<LoginValues> = (values) => {
//   login(values);
// };

    //Function
    const onSubmit: SubmitHandler<LoginValues> = (values) => {
        console.log(values);
    }

    return <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className= "w-full flex flex-col">
            {/* Email */}
            <FormField 
                name="email"
                control={form.control}
                render={(field) => <FormItem className="mb-4 w-full">
                {/* label */}
                <Label>Email</Label>
                {/* field */}
                <FormControl>
                    <Input {...field} placeholder="user@example.com" />
                </FormControl>
                {/* message */}
                <FormMessage />
                </FormItem>}
            />

            {/* Password */}
            <FormField 
                name="password"
                control={form.control}
                render={(field) => <FormItem className="mb-2.5">
                {/* label */}
                <Label>Password</Label>
                {/* field */}
                <FormControl>
                    <Input {...field} placeholder="********" type="password" />
                </FormControl>
                {/* message */}
                <FormMessage />
                </FormItem>}
            />

            <Link href="/forgot-password" className="font-semibold text-sm text-maroon-700 mb-9 text-end">Forgot your password?</Link>
            {/* Submit */}

             <Button
                type="submit"
                variant="default"
                size="default"
                disabled={isPending || (form.formState.isSubmitted && !form.formState.isValid)}
                className="mt-5 h-12 w-full bg-maroon-600 text-base font-medium text-white"
                >
                Login
                </Button>

        </form>
    </Form>
}