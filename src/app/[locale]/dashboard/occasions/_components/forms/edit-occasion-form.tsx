"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useUpdateOccasion } from "../../_hooks/use-update-occasion";
import { UpdateOccasionFormValues, updateOccasionSchema } from "@lib/schemas/dashboard/occasion.schema";
import OccasionImageDialog from "../image-dialog";

interface EditOccasionFormProps {
    occasionId: string;
    occasionName: string;
    occasionImage?: string;
}

export default function EditOccasionForm({ occasionId, occasionName, occasionImage }: EditOccasionFormProps) {
    // Hooks
    const router = useRouter();

    // Form setup
    const form = useForm<UpdateOccasionFormValues>({
        resolver: zodResolver(updateOccasionSchema),
        defaultValues: { name: occasionName },
    });

    // Mutation hook
    const updateMutation = useUpdateOccasion();

    // Populate form when occasionName changes
    useEffect(() => {
        if (occasionName) form.reset({ name: occasionName });
    }, [occasionName, form]);

    // Form submission
    const onSubmit = (values: UpdateOccasionFormValues) => {
        // Trigger update mutation
        updateMutation.mutate(
            { occasionId, data: { name: values.name } },
            {
                onSuccess: (response) => {
                    if (response.ok) {
                        toast.success("Occasion updated successfully!");
                        router.push("/occasions");
                    } else {
                        const error = response.payload as { error?: string };
                        toast.error(error.error || "Update failed");
                    }
                },
                onError: (error) => {
                    toast.error(error.message || "Update failed");
                },
            }
        );
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

                    {/* Dialog Component */}
                    {occasionImage && (
                        <div className="flex w-[46.625rem] items-center justify-end">
                            <OccasionImageDialog occasionImage={occasionImage} occasionName={occasionName} />
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button
                        size="xl"
                        type="submit"
                        variant="default"
                        className="mt-32 w-[46.625rem] text-white"
                        disabled={updateMutation.isPending}
                    >
                        {updateMutation.isPending ? "Updating..." : "Update Occasion"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
