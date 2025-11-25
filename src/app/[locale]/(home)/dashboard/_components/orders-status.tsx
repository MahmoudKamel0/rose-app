"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { fetchStatistics } from "@lib/apis/dashboard/orders-status.api";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function OrdersStatusCard() {
    // Translation hook, scoped to "ordersStatus" namespace
    const t = useTranslations("ordersStatus");

    // States to hold the count of each order status
    const [completed, setCompleted] = useState(0);
    const [inProgress, setInProgress] = useState(0);
    const [canceled, setCanceled] = useState(0);

    // Fetch order statistics on component mount
    useEffect(() => {
        async function load() {
            try {
                const res = await fetchStatistics();
                const statuses = res.statistics.orders.ordersByStatus;

                setCompleted(statuses.find((s) => s._id === "completed")?.count || 0);
                setInProgress(statuses.find((s) => s._id === "in_progress")?.count || 0);
                setCanceled(statuses.find((s) => s._id === "canceled")?.count || 0);
            } catch (err) {
                const message = err instanceof Error ? err.message : t("fetchError");

                toast.error(message);
                console.error(message, err);
            }
        }
        load();
    }, [t]);

    // Calculate total orders for percentage calculation
    const total = completed + inProgress + canceled;

    // Prepare pie chart data
    const data = [
        { label: t("completed"), value: completed, color: "#00BC7D" },
        { label: t("inProgress"), value: inProgress, color: "#2B7FFF" },
        { label: t("canceled"), value: canceled, color: "#DC2626" },
    ];

    return (
        <Card className="w-[17.3rem] rounded-2xl border-0 bg-white pt-4 shadow-none outline-0">
            {/* Card header */}
            <CardHeader className="p-0 text-center">
                <CardTitle className="text-2xl font-semibold">{t("title")}</CardTitle>
            </CardHeader>

            {/* Card content */}
            <CardContent className="flex flex-col items-center p-4 pt-0">
                {/* Pie chart */}
                <div className="my-9 h-[10.687rem] w-[10.687rem]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="label"
                                innerRadius={45}
                                outerRadius={85}
                                stroke="none"
                                labelLine={false}
                                label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
                                    if (value === 0 || midAngle === undefined) return null;

                                    const RADIAN = Math.PI / 180;
                                    const radius = innerRadius + (outerRadius - innerRadius) / 2;
                                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                    const percent = total > 0 ? (value / total) * 100 : 0;

                                    // Render circle and percentage text inside the pie slice
                                    return (
                                        <g>
                                            <circle cx={x} cy={y} r={16} fill="#f3f4f6" />
                                            <text
                                                x={x}
                                                y={y}
                                                fill="#000"
                                                textAnchor="middle"
                                                dominantBaseline="central"
                                                fontSize={10}
                                                fontWeight={700}
                                                fontFamily="Inter"
                                            >
                                                {`${Math.round(percent)}%`}
                                            </text>
                                        </g>
                                    );
                                }}
                            >
                                {/* Set slice colors */}
                                {data.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="mt-3 space-y-4 text-sm">
                    {data.map((item, index) => {
                        const percent = total > 0 ? Math.round((item.value / total) * 100) : 0;
                        return (
                            <div key={index} className="flex items-center gap-24">
                                <div className="flex items-center gap-1">
                                    <span className="h-3 w-3 rounded-full" style={{ background: item.color }}></span>
                                    <span className="text-[0.75rem] font-semibold">{item.label}</span>
                                </div>
                                <span className="flex-1 text-center text-[0.75rem] font-semibold">
                                    {item.value} ({percent}%)
                                </span>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
