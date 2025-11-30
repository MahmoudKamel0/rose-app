"use client";

import { Button } from "@components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import { Textarea } from "@components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { setProductSchema, setProductValue } from "@lib/schemas/dashboard/products.schema";
import { ProductDashboardSteps } from "@lib/types/product-dashboard";
import { Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCategories } from "../../hooks/use-categories.hook";
import { useOccasions } from "../../hooks/use-occasions.hook";
import { useAddProduct, useEditProduct } from "../../hooks/use-dashboard-product.hook";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function ProductForm({
    setStep,
    productId,
    productTitle,
    productDescription,
    productPrice,
    productCategory,
    productOccasion,
    productQuantity,
    productPriceAfterDiscount,
    mode,
}: {
    setStep: React.Dispatch<React.SetStateAction<ProductDashboardSteps>>;
    productId?: string;
    productTitle?: string;
    productDescription?: string;
    productPrice?: string;
    productCategory?: string;
    productOccasion?: string;
    productQuantity?: string;
    productPriceAfterDiscount?: string;
    mode: "edit" | "create";
}) {
    const t = useTranslations("product-form");

    // Hooks
    const { categoryData, isPending: categoryIsPending } = useCategories();
    const { occasionData, isPending: occasionIsPending } = useOccasions();
    const { addProduct, isPending: addIsPending } = useAddProduct();
    const { editProduct, isPending: editIsPending } = useEditProduct();

    //Form
    const form = useForm<setProductValue>({
        resolver: zodResolver(setProductSchema),
        defaultValues: {
            title: productTitle || "Ahmed 2003",
            description: productDescription || "asfaSfasfasfasfasfasfsf",
            price: productPrice || "8",
            discount: "0",
            category: productCategory || "6407e96c5bbc6e43516931d7",
            images: undefined,
            imgCover: undefined,
            occasion: productOccasion,
            quantity: productQuantity || "6",
            priceAfterDiscount: productPriceAfterDiscount || "0",
        },
    });

    // Use states
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

    // Use effect
    const price = form.watch("price");
    const discount = form.watch("discount");

    useEffect(() => {
        const d = Number(discount) || 0;
        const p = Number(price) || 0;
        const final = Math.max(0, p - d);
        form.setValue("priceAfterDiscount", final.toString(), { shouldValidate: true, shouldDirty: true });
    }, [price, discount, form]);

    // Functions
    const onSubmit = async (data: setProductValue) => {
        const formData = new FormData();

        // Add text fields
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("discount", data?.discount || "0");
        formData.append("quantity", data.quantity);
        formData.append("category", data.category);
        formData.append("occasion", data.occasion);
        formData.append("priceAfterDiscount", data.priceAfterDiscount);

        // Add cover image
        if (data.imgCover && data.imgCover.length > 0) {
            formData.append("imgCover", data.imgCover[0]);
        }

        // Add gallery images
        if (data.images && data.images.length > 0) {
            for (let i = 0; i < data.images.length; i++) {
                formData.append("images", data.images[i]);
            }
        }

        if (mode == "create") {
            await addProduct(formData, {
                onSuccess: () => {
                    toast.success(t("toast-added"));
                    setStep("products_dashboard");
                },
                onError: (error: Error) => {
                    toast.error(error.message);
                },
            });
        }

        if (mode == "edit" && productId) {
            await editProduct(
                { data: formData, id: productId },
                {
                    onSuccess: () => {
                        toast.success(t("toast-saved"));
                        setStep("products_dashboard");
                    },
                    onError: (error: Error) => {
                        toast.error(error.message);
                    },
                }
            );
        }
    };

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-1 flex-col items-center gap-4">
                    {/* Title */}
                    <FormField
                        name="title"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>{t("title")}</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder={t("title-placeholder")}
                                        aria-invalid={!!form.formState.errors.title}
                                        className="p-4"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* description */}
                    <FormField
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>{t("description")}</FormLabel>
                                <FormControl>
                                    <Textarea
                                        error={!!form.formState.errors.description}
                                        {...field}
                                        placeholder={t("description-placeholder")}
                                        aria-invalid={!!form.formState.errors.description}
                                        className="h-36 p-4"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex w-full items-center gap-2 pb-4">
                        {/* Price */}
                        <FormField
                            name="price"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>{t("price")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            min={0}
                                            placeholder={t("price-placeholder")}
                                            aria-invalid={!!form.formState.errors.price}
                                            className="p-4"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Discount */}
                        <FormField
                            name="discount"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>{t("discount")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            min={0}
                                            type="number"
                                            placeholder={t("discount-placeholder")}
                                            aria-invalid={!!form.formState.errors.discount}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Price After Discount */}
                        <FormField
                            name="priceAfterDiscount"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>{t("price-after-discount")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder={t("price-after-discount-placeholder")}
                                            aria-invalid={!!form.formState.errors.priceAfterDiscount}
                                            className="p-4"
                                            disabled
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Quantity */}
                    <FormField
                        name="quantity"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>{t("quantity")}</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        min={1}
                                        type="number"
                                        placeholder={t("quantity-placeholder")}
                                        aria-invalid={!!form.formState.errors.quantity}
                                        className="p-4"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Image cover */}
                    <div className="flex w-full items-center gap-3">
                        <div className="w-full">
                            <FormField
                                name="imgCover"
                                control={form.control}
                                render={({ field: { onChange, onBlur, name, ref } }) => (
                                    <FormItem>
                                        <FormLabel>{t("cover-image")}</FormLabel>

                                        <FormControl>
                                            <div
                                                className={`flex items-center rounded-md border px-4 py-3 ${
                                                    galleryFiles.length > 0 ? "justify-between" : "justify-end"
                                                } ${form.formState.errors.imgCover ? "border-red-600" : ""}`}
                                            >
                                                <span className="text-sm text-muted-foreground">
                                                    {selectedFile ? selectedFile.name : ""}
                                                </span>

                                                <label
                                                    htmlFor="fileInput"
                                                    className="flex cursor-pointer items-center gap-1 text-sm font-medium text-maroon-500"
                                                >
                                                    <Upload size={18} />
                                                    {t("upload-file")}
                                                </label>

                                                <Input
                                                    id="fileInput"
                                                    type="file"
                                                    className=""
                                                    onChange={(e) => {
                                                        onChange(e.target.files);
                                                        setSelectedFile(e.target.files?.[0] || null);
                                                    }}
                                                    onBlur={onBlur}
                                                    name={name}
                                                    ref={ref}
                                                />
                                            </div>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Product gallery */}
                        <FormField
                            name="images"
                            control={form.control}
                            render={({ field: { onChange, onBlur, name, ref } }) => (
                                <FormItem className="w-full">
                                    <FormLabel>{t("gallery")}</FormLabel>

                                    <FormControl>
                                        <div
                                            className={`flex items-center rounded-md border px-4 py-3 ${
                                                galleryFiles.length > 0 ? "justify-between" : "justify-end"
                                            } ${form.formState.errors.images ? "border-red-600" : ""}`}
                                        >
                                            <span className="flex-1 text-sm text-muted-foreground">
                                                {galleryFiles.length === 0 ? "" : `${galleryFiles.length} ${t("files-selected")}`}
                                            </span>

                                            <label
                                                htmlFor="galleryInput"
                                                className="flex cursor-pointer items-center gap-1 text-sm font-medium text-maroon-500"
                                            >
                                                <Upload size={18} />
                                                {t("upload-files")}
                                            </label>

                                            <Input
                                                id="galleryInput"
                                                type="file"
                                                multiple
                                                className=""
                                                onChange={(e) => {
                                                    const files = Array.from(e.target.files ?? []);
                                                    onChange(e.target.files);
                                                    setGalleryFiles(files);
                                                }}
                                                onBlur={onBlur}
                                                name={name}
                                                ref={ref}
                                            />
                                        </div>
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Category */}
                    <FormField
                        name="category"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>{t("category")}</FormLabel>
                                <Select value={field.value} onValueChange={(value) => field.onChange(value)} disabled={categoryIsPending}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder={t("select-option")} />
                                    </SelectTrigger>
                                    <SelectContent className="h-48 overflow-y-scroll">
                                        {categoryData?.statistics?.map((category) => (
                                            <SelectItem key={category._id} value={category._id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Occasion */}
                    <FormField
                        name="occasion"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>{t("occasion")}</FormLabel>
                                <Select value={field.value} onValueChange={(value) => field.onChange(value)} disabled={occasionIsPending}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder={t("select-option")} />
                                    </SelectTrigger>
                                    <SelectContent className="h-48 overflow-y-scroll">
                                        {occasionData?.occasions?.map((occasion) => (
                                            <SelectItem key={occasion._id} value={occasion._id}>
                                                {occasion.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        size={"xl"}
                        disabled={
                            form.formState.isSubmitting || !form.formState.isValid || (mode === "create" ? addIsPending : editIsPending)
                        }
                    >
                        {mode === "create"
                            ? addIsPending
                                ? t("adding")
                                : t("add-product")
                            : editIsPending
                              ? t("saving")
                              : t("save-changes")}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
