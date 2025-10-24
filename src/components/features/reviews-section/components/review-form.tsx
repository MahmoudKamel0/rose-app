"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import clsx from "clsx";
import { ReviewInput, reviewSchema } from "@lib/schemas/review.schema";
import { toast } from "sonner";
import { useReview } from "../../../../hooks/reviews/use-review";
import { useTranslations } from "next-intl";
import { ReviewsSectionProps } from "@lib/types/review-product";

export default function ReviewForm({ productId }: ReviewsSectionProps) {
    // Translations
    const t = useTranslations("reviewForm");

    // Form state and validation
    const form = useForm<ReviewInput>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            product: productId,
            rating: 0,
            title: "",
            comment: "",
        },
    });

    // Rating state
    const [rating, setRating] = useState(0);

    // Authentication state
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Mutation hook
    const reviewMutation = useReview();

    // Check authentication on mount
    useEffect(() => {
        // Function to check authentication status
        const checkAuth = async () => {
            try {
                // Fetch token
                const res = await fetch("/api/auth/token", { credentials: "include" });

                // Handle non-OK responses
                if (!res.ok) {
                    console.warn("Failed to fetch token:", res.status);
                    setIsAuthenticated(false);
                    return;
                }

                // Parse response data
                const data = await res.json();

                // Check if access token exists
                setIsAuthenticated(!!data?.accessToken);
            } catch (error) {
                console.error("Error checking auth status:", error);

                // Set authentication status to false
                setIsAuthenticated(false);
            }
        };

        // Call the checkAuth function
        checkAuth();
    }, []);

    // Handle form submission
    const onSubmit = (data: ReviewInput) => {
        // Prevent submission if not authenticated
        if (!isAuthenticated) {
            toast.error(t("authenticationRequired"));
            return;
        }

        // Execute the review mutation
        reviewMutation.mutate(data, {
            // Success callback
            onSuccess: () => {
                toast.success(t("toast.success"));
                form.reset();
                setRating(0);
            },
            // Error callback
            onError: (err: any) => {
                toast.error(err.message || t("toast.error"));
            },
        });
    };

    return (
        <Form {...form}>
            {/* Form */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="relative w-[30.25rem] space-y-3 border-l-1 p-4">
                {!isAuthenticated && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-md bg-white/80">
                        <p className="font-primary text-[16px] leading-[100%] font-semibold tracking-[0] text-zinc-800 not-italic dark:text-zinc-50">
                            {t("authenticationRequired")}
                        </p>
                    </div>
                )}

                {/* Rating Field */}
                <FormField
                    control={form.control}
                    name="rating"
                    render={() => (
                        <FormItem className="flex items-center gap-4">
                            <FormLabel className="mb-0 font-medium">{t("yourRating")}</FormLabel>
                            <div className="mt-1 flex space-x-1">
                                {Array.from({ length: 5 }).map((_, i) => {
                                    const starValue = i + 1;
                                    return (
                                        <Star
                                            key={i}
                                            onClick={() => {
                                                if (!isAuthenticated) return;
                                                setRating(starValue);
                                                form.setValue("rating", starValue);
                                            }}
                                            className={clsx(
                                                "h-6 w-6 cursor-pointer transition-colors",
                                                starValue <= rating ? "fill-[#FFA508] text-[#FFA508]" : "text-[#FFA508]",
                                                !isAuthenticated && "cursor-not-allowed opacity-40"
                                            )}
                                        />
                                    );
                                })}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Title Field */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("title")}</FormLabel>
                            <FormControl>
                                <Input placeholder={t("titlePlaceholder")} {...field} disabled={!isAuthenticated} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Comment Field */}
                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("review")}</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder={t("commentPlaceholder")}
                                    className="max-h-[9.4rem] min-h-[9.4rem]"
                                    {...field}
                                    disabled={!isAuthenticated}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full bg-[#a02828] text-white hover:bg-[#881f1f]"
                    disabled={!isAuthenticated || reviewMutation.isPending}
                >
                    {reviewMutation.isPending ? t("submitting") : t("submit")}
                </Button>
            </form>
        </Form>
    );
}
