"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateCategory } from "../../_hooks/hooks";
import { ViewImage } from "./view-image";
import { useTranslations } from "next-intl";

export default function UpdateCategoryForm({ id, name, image }: { id: string; name: string; image: string }) {
    // translation
    const t = useTranslations("dashboard.categories.update");

    const updateCategorySchema = z.object({
        name: z.string().min(1, { message: t("form.nameRequired") }),
    });

    type UpdateCategoryFormValues = z.infer<typeof updateCategorySchema>;

    const { mutate, isPending } = useUpdateCategory();

    const form = useForm<UpdateCategoryFormValues>({
        resolver: zodResolver(updateCategorySchema),
        defaultValues: { name: name || "" },
    });

    function onSubmit(values: UpdateCategoryFormValues) {
        const formData = new FormData();
        formData.append("name", values.name);
        mutate({ categoryId: id, data: formData });
    }
    return (
        <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-zinc-800">
                {t("pageTitle")} {name}{" "}
            </h2>
            <div className="mt-4 rounded-lg bg-white p-6">
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
                                            {t("form.nameLabel")} <span className="text-red-600">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder={t("form.nameLabel")} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end">
                                <ViewImage imageUrl={image} />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" className="mt-auto w-full" disabled={isPending}>
                            {isPending ? t("form.updating") : t("form.submitButton")}
                        </Button>
                    </form>
                </Form>
            </div>
        </section>
    );
}
