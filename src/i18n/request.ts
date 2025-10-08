import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { hasLocale } from "next-intl";

export default getRequestConfig(async ({ requestLocale }) => {
    // Get the requested locale
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

    // Define reusable flag for Arabic
    const isArabic = locale === "ar";

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default,

        formats: {
            // Date formats
            dateTime: {
                short: isArabic
                    ? {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          numberingSystem: "arab",
                      }
                    : {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                      },

                long: isArabic
                    ? {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          numberingSystem: "arab",
                      }
                    : {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                      },

                full: isArabic
                    ? {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          numberingSystem: "arab",
                      }
                    : {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                      },
            },

            // Number formats
            number: {
                currency: {
                    style: "currency",
                    currency: isArabic ? "EGP" : "USD",
                },
                percent: {
                    style: "percent",
                    minimumFractionDigits: 2,
                },
                decimal: {
                    minimumFractionDigits: 2,
                },
            },
        },
    };
});
