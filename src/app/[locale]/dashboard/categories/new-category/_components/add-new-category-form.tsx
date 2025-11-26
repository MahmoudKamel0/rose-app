"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useCreateCategory } from "../../_hooks/hooks";

// 1️⃣ Define Zod schema
const addCategorySchema = z.object({
    name: z.string().min(1, "Name is required"),
    image: z.any().refine((file) => file instanceof File, "Image is required"),
});

// 2️⃣ Infer form type
type AddCategoryFormValues = z.infer<typeof addCategorySchema>;

export default function AddCategoryForm() {
    const { mutate, isPending, error } = useCreateCategory();

    const form = useForm<AddCategoryFormValues>({
        resolver: zodResolver(addCategorySchema),
        defaultValues: {
            name: "",
            image: null,
        },
    });

    function onSubmit(values: AddCategoryFormValues) {
        const formData = new FormData();
        formData.append("name", values.name);
        if (values.image) formData.append("image", values.image);
        console.log(formData);
        mutate(formData);
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

                    {/* Image Field */}
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => {
                            const hasError = !!form.formState.errors.image;
                            return (
                                <FormItem>
                                    <FormLabel className="font-medium">
                                        Category image <span className="text-red-600">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <div
                                            className={`flex w-full cursor-pointer items-center justify-between rounded-md border px-3 py-2 hover:bg-gray-50 ${hasError ? "border-red-600" : "border-gray-300"} `}
                                            onClick={() => document.getElementById("category-image")?.click()}
                                        >
                                            <span className={`text-gray-400 ${hasError ? "text-red-600" : ""}`}>
                                                {field.value ? field?.value?.name : ""}
                                            </span>
                                            <div className="flex items-center gap-1 font-medium text-red-600">
                                                <Upload size={16} />
                                                <span>Upload file</span>
                                            </div>
                                            <input
                                                id="category-image"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="mt-auto w-full" disabled={isPending}>
                    {isPending ? "Saving..." : "Save"}
                </Button>
            </form>
        </Form>
    );
}
