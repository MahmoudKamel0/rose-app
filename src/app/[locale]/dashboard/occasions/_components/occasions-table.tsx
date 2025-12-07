import { Occasion } from "@lib/types/dashboard/occasions";
import OccasionsRow from "./occasions-row";
import { useTranslations } from "next-intl";

export default function OccasionsTable({ occasions }: { occasions: Occasion[] }) {
    // Translation hook
    const t = useTranslations("Occasions");

    return (
        <div className="rounded-md border-none">
            <table className="w-full">
                <thead>
                    <tr className="border-b bg-zinc-50 text-left">
                        {/* Column: Name */}
                        <th className="h-10 w-40 ps-5">{t("table.name")}</th>

                        {/* Column: Products */}
                        <th className="h-10">{t("table.products")}</th>

                        {/* Column: Actions (empty header) */}
                        <th className="h-10 w-0 pe-5"></th>
                    </tr>
                </thead>

                {/* Table body: all rows */}
                <tbody>
                    {occasions.map((item) => (
                        <OccasionsRow key={item._id} item={item} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
