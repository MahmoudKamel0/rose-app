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
import { useAddProduct } from "../../hooks/use-dashboard-product.hook";
import { toast } from "sonner";

export default function CreateProduct({ setStep }: { setStep: React.Dispatch<React.SetStateAction<ProductDashboardSteps>> }) {
    // Hooks
    const { categoryData, isPending: categoryIsPending } = useCategories();
    const { occasionData, isPending: occasionIsPending } = useOccasions();
    const { mutateAsync } = useAddProduct();

    //Form
    const form = useForm<setProductValue>({
        resolver: zodResolver(setProductSchema),
        defaultValues: {
            title: "Ahmed 2003",
            description: "asfaSfasfasfasfasfasfsf",
            price: "8",
            discount: "5",
            category: "6407e96c5bbc6e43516931d7",
            images: undefined,
            imgCover: undefined,
            occasion: "6407e96c5bbc6e43516931d7",
            quantity: "6",
            priceAfterDiscount: "0",
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

        await mutateAsync(formData, {
            onSuccess: () => {
                toast.success("Product added successfully");
                setStep("products_dashboard");
            },
        });
    };

    return (
        <div>
            {/* Title */}
            <div className="mb-6 text-2xl font-semibold text-zinc-800 dark:text-zinc-50">Add a New Product</div>

            {/* Content */}
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-1 flex-col items-center gap-4">
                        {/* Title */}
                        <FormField
                            name="title"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Enter your title"
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
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Enter your description"
                                            aria-invalid={!!form.formState.errors.description}
                                            className="h-36 p-4"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex w-full items-center gap-2">
                            {/* Price */}
                            <FormField
                                name="price"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                min={0}
                                                placeholder="Example: 5000"
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
                                        <FormLabel>Discount</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                min={0}
                                                type="number"
                                                placeholder="Example: 5"
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
                                        <FormLabel>Price After Discount</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="Example: 5"
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
                                    <FormLabel>Quantity</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            min={1}
                                            type="number"
                                            placeholder="Example: 200"
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
                                            <FormLabel>Product cover image</FormLabel>

                                            <FormControl>
                                                <div className="flex items-center justify-between rounded-md border px-4 py-3">
                                                    {/* Custom text */}
                                                    <span className="text-sm text-muted-foreground">
                                                        {selectedFile ? selectedFile.name : ""}
                                                    </span>

                                                    {/* Trigger button */}
                                                    <label
                                                        htmlFor="fileInput"
                                                        className="flex cursor-pointer items-center gap-1 text-sm font-medium text-maroon-500"
                                                    >
                                                        <Upload size={18} />
                                                        Upload file
                                                    </label>

                                                    {/* Hidden real input */}
                                                    <input
                                                        id="fileInput"
                                                        type="file"
                                                        className="hidden"
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
                                        <FormLabel>Product gallery</FormLabel>

                                        <FormControl>
                                            <div className="flex items-center justify-between rounded-md border px-4 py-3">
                                                {/* Display file info */}
                                                <span className="text-sm text-muted-foreground">
                                                    {galleryFiles.length === 0 ? "" : `${galleryFiles.length} file(s) selected`}
                                                </span>

                                                {/* Trigger button */}
                                                <label
                                                    htmlFor="galleryInput"
                                                    className="flex cursor-pointer items-center gap-1 text-sm font-medium text-maroon-500"
                                                >
                                                    <Upload size={18} />
                                                    Upload files
                                                </label>

                                                {/* Hidden input */}
                                                <input
                                                    id="galleryInput"
                                                    type="file"
                                                    multiple
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const files = Array.from(e.target.files ?? []);
                                                        onChange(e.target.files); // send files to react-hook-form
                                                        setGalleryFiles(files); // store file list for UI
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
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        value={field.value}
                                        onValueChange={(value) => field.onChange(value)}
                                        disabled={categoryIsPending}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select an option" />
                                        </SelectTrigger>
                                        <SelectContent className="h-48 overflow-y-scroll">
                                            {categoryData?.statistics?.map((category) => (
                                                <SelectItem key={category._id} value={category._id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="occasion"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Occasion</FormLabel>
                                    <Select
                                        value={field.value}
                                        onValueChange={(value) => field.onChange(value)}
                                        disabled={occasionIsPending}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select an option" />
                                        </SelectTrigger>
                                        <SelectContent className="h-48 overflow-y-scroll">
                                            {occasionData?.occasions?.map((occasion) => (
                                                <SelectItem key={occasion._id} value={occasion._id}>
                                                    {occasion.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <Button type="submit" size={"xl"}>
                            submit
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
