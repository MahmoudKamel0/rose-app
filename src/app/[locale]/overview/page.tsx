import ToggleLocale from "@components/layout/header/toggle-locale";
import { useTranslations } from "next-intl";

export default function HomePage() {
    // To use translations, call the `useTranslations` hook with the namespace of your messages.
    // For example, if your messages are in `messages/home.json`, use `useTranslations('home')`.
    const t = useTranslations();
    return (
        <>
            <p>{t("hello-world")}</p>
            <ToggleLocale />
        </>
    );
}
