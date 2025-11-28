import { Occasion } from "@lib/types/dashboard/occasions";
import OccasionsRow from "./occasions-row";
import SearchInput from "./search-input";

export default function OccasionsTable({ occasions }: { occasions: Occasion[] }) {
    return (
        <div className="rounded-md border-none">

            <table className="w-full">
                <thead>
                    <tr className="border-b bg-zinc-50 text-left">
                        <th className="h-10 w-40 ps-5">Name</th>
                        <th className="h-10">Products</th>
                        <th className="h-10 w-0 pe-5"></th>
                    </tr>
                </thead>

                <tbody>
                    {occasions.map((item) => (
                        <OccasionsRow key={item._id} item={item} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
