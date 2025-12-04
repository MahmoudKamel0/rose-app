import z from "zod";

const imageFileList = z.instanceof(FileList).refine(
    (files) => {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!file.type.startsWith("image/")) {
                return false;
            }
        }
        return true;
    },
    {
        message: "Only image files are allowed",
    }
);

export const setProductSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters lang").max(50, "Title must be at most 50 characters lang"),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters lang")
        .max(500, "Description must be at most 500 characters lang"),
    price: z.string().min(1, "Price is required"),
    discount: z.string().optional(),
    priceAfterDiscount: z.string(),
    quantity: z.string().min(1, "Quantity must be at least 1"),
    imgCover: imageFileList.refine((files) => files.length === 1, "At least one cover image is required"),
    images: imageFileList.refine((files) => files.length <= 5, "You can upload up to 5 images"),
    category: z.string().min(1, "Category is required"),
    occasion: z.string().min(1, "Occasion is required"),
});

export type setProductValue = z.infer<typeof setProductSchema>;
