import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@components/ui/button";
import { Category } from "@lib/apis/dashboard/categories/categories";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { id } from "zod/v4/locales";
import DeleteCategory from "./delete-category";

const invoices = [
    {
        id: 1,
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        id: 2,
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        id: 3,
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        id: 4,
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        id: 5,
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        id: 6,
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        id: 7,
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
];

interface CategoryTableProps {
    categories: Category[];
}

export function CategoryTable({ categories }: CategoryTableProps) {
    return (
        <Table className="mb-0.5">
            <TableHeader className="h-10 rounded-lg border-black bg-zinc-50 text-sm font-medium">
                <TableRow>
                    <TableHead className="">Name</TableHead>
                    <TableHead className="">Products</TableHead>
                    <TableHead className="text-end"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categories.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={3} className="h-24 text-center text-sm font-medium">
                            No categories found.
                        </TableCell>
                    </TableRow>
                )}
                {categories.map((category) => (
                    <TableRow key={category._id} className="h-[60px] hover:bg-maroon-50">
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell className="">{category.productsCount}</TableCell>
                        <TableCell className="text-end">
                            <div className="flex items-center justify-end gap-2 font-medium">
                                <Link
                                    href={`categories/${category._id}?name=${category.name}`}
                                    className="flex min-h-7 min-w-14 items-center justify-center rounded-md bg-[#0063D01A] text-blue-600 hover:bg-[#0063D033]"
                                >
                                    <Pencil className="mr-1 stroke-[3]" size={14} />
                                    Edit
                                </Link>
                                <DeleteCategory />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
