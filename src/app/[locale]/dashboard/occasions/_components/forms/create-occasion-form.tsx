"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload } from "lucide-react";

import { CreateOccasionResponse, CreateOccasionErrorResponse } from "@/lib/types/dashboard/occasions";
import { CreateOccasionFormValues, createOccasionSchema } from "@lib/schemas/dashboard/occasion.schema";
import { useCreateOccasion } from "../../_hooks/use-create-occasions";

export default function CreateOccasionForm() {
    // Hooks
    const router = useRouter();

    // States
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Form setup
    const form = useForm<CreateOccasionFormValues>({
        resolver: zodResolver(createOccasionSchema),
        defaultValues: {
            name: "",
            image: undefined,
        },
    });

    // Mutation hook
    const createMutation = useCreateOccasion();

    // Handlers
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("image", file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Form submission
    const onSubmit = (values: CreateOccasionFormValues) => {
        // Create form data
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("image", values.image);

        // Trigger mutation
        createMutation.mutate(formData, {
            onSuccess: (response) => {
                if (response.ok) {
                    const successPayload = response.payload as CreateOccasionResponse;
                    toast.success("Occasion created successfully!");
                    form.reset();
                    setImagePreview(null);
                    router.push("/occasions");
                } else {
                    const errorPayload = response.payload as CreateOccasionErrorResponse;
                    toast.error(errorPayload.error || "Create failed");
                }
            },
            onError: (error: any) => {
                toast.error(error.message || "Create failed");
            },
        });
    };

    return (
        <div className="rounded-lg bg-white p-6 shadow-sm">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Name Field */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="mb-5">
                                <FormLabel className="text-sm font-medium text-gray-700">
                                    Name <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter occasion name" className="mt-1 w-[46.625rem]" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Image Upload Field */}
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field: { value, onChange, ...field } }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700">
                                    Occasion Image <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <div className="relative flex w-[46.625rem] items-center gap-4">
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            className="hidden w-[46.625rem]"
                                            id="image-upload"
                                            onChange={handleImageChange}
                                            {...field}
                                        />
                                        <label
                                            htmlFor="image-upload"
                                            className="absolute right-4 flex cursor-pointer items-center gap-2 text-sm text-maroon-500"
                                        >
                                            <Upload className="h-4 w-4" />
                                            Upload file
                                        </label>
                                        {imagePreview && <span className="text-sm text-gray-600">Image selected</span>}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="default"
                        size="xl"
                        className="mt-32 w-[46.625rem] text-white"
                        disabled={createMutation.isPending}
                    >
                        {createMutation.isPending ? "Adding..." : "Add Occasion"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
