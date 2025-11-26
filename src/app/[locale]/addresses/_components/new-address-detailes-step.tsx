import { Button } from "@components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Input } from "@components/ui/input";
import { PhoneInput } from "@components/ui/phone-input";
import { Textarea } from "@components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressFormData, SetAddressesSchema } from "@lib/schemas/addresses.schema";
import { NewAddressStepProps } from "@lib/types/end-point-api/addresses";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";

export default function NewAddressDetailesStep({ setNewAddressStep, newAddressData, setNewAddressData }: NewAddressStepProps) {
    // Tranalations
    const t = useTranslations("address-step-1");
    // Form
    const form = useForm<AddressFormData>({
        resolver: zodResolver(SetAddressesSchema),
        defaultValues: {
            city: newAddressData?.city || "",
            street: newAddressData?.street || "",
            phone: newAddressData?.phone || "",
        },
    });
    const { isValid } = form.formState;
    return (
        <>
            <div>
                <h2 className="border-b-1 border-b-zinc-200 pb-2.5 text-2xl font-medium text-maroon-600 dark:text-softpink-200">
                    {t("enter")}
                </h2>
                <Form {...form}>
                    <form
                        className="space-y-6"
                        onSubmit={form.handleSubmit((values) => {
                            if (setNewAddressData) {
                                setNewAddressData({ ...newAddressData, ...values });
                            }
                            setNewAddressStep("new_address_loaction_step");
                        })}
                    >
                        <FormField
                            name="city"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("city")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Enter your city"
                                            aria-invalid={!!form.formState.errors.city}
                                            className="p-4"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="street"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("address")}</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Enter your address"
                                            aria-invalid={!!form.formState.errors.street}
                                            className="!h-40 p-4"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("phone")}</FormLabel>
                                    <FormControl className="w-full">
                                        <PhoneInput
                                            className="w-full"
                                            placeholder="1012345678"
                                            {...field}
                                            defaultCountry="EG"
                                            countryCallingCodeEditable={false}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button variant={"default"} type="submit" className="mt-14 w-full" disabled={!isValid}>
                            {t("next-step")}
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    );
}
