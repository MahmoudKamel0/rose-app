"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";

// 1️⃣ Define Zod schema
const updateCategorySchema = z.object({
    name: z.string().min(1, "Name is required"),
});

// 2️⃣ Infer form type
type UpdateCategoryFormValues = z.infer<typeof updateCategorySchema>;

export default function UpdateCategoryForm({ id, name }: { id: string; name: string }) {
    const form = useForm<UpdateCategoryFormValues>({
        resolver: zodResolver(updateCategorySchema),
        defaultValues: {
            name: name || "",
        },
    });

    function onSubmit(values: UpdateCategoryFormValues) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex min-h-[383px] w-[746px] flex-col gap-6">
                <div className="flex flex-1 flex-col gap-6">
                    {/* Name Field */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-medium">
                                    Name <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter category name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end">
                        <Button
                            type="button"
                            className="flex h-10 w-48 items-center justify-center gap-1 border border-blue-500 bg-white text-blue-500 hover:bg-blue-50"
                        >
                            <Image className="stroke-blue-500 text-blue-500" width={18} height={18} />
                            View category image
                        </Button>
                    </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="mt-auto w-full">
                    Update Category
                </Button>
            </form>
        </Form>
    );
}
