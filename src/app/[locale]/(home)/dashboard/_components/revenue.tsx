"use client";

import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, CartesianGrid, YAxis } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { fetchStatistics } from "@lib/apis/dashboard/orders-status.api";
import { DailyRevenue, MonthlyRevenue } from "@lib/types/dashboard/orders-status";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function RevenueChart() {
    // Translation hook, scoped to "revenueChart" namespace
    const t = useTranslations("revenueChart");

    // State to toggle between monthly and weekly revenue data
    const [mode, setMode] = useState<"monthly" | "weekly">("monthly");

    // State to store fetched daily and monthly revenue data
    const [dailyRevenue, setDailyRevenue] = useState<DailyRevenue[]>([]);
    const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenue[]>([]);

    // Chart configuration (labels and colors)
    const chartConfig = {
        revenue: {
            label: t("title"), // Translated label
            color: "#A6252A",
        },
    };

    // Fetch revenue statistics when component mounts
    useEffect(() => {
        async function load() {
            try {
                const stats = await fetchStatistics();
                setDailyRevenue(stats.statistics.orders.dailyRevenue);
                setMonthlyRevenue(stats.statistics.orders.monthlyRevenue);
            } catch (err) {
                const message = err instanceof Error ? err.message : t("fetchError");

                toast.error(message);
                console.error(t("fetchError"), err);
            }
        }
        load();
    }, [t]);

    // Prepare chart data depending on the current mode
    const chartData =
        mode === "monthly"
            ? monthlyRevenue.map((m) => ({ date: m._id, revenue: m.revenue }))
            : dailyRevenue.map((d) => ({ date: d._id, revenue: d.revenue }));

    // Calculate min and max revenue for Y-axis domain padding
    const revenues = chartData.map((d) => d.revenue);
    const minRevenue = Math.min(...revenues);
    const maxRevenue = Math.max(...revenues);
    const paddedMin = Math.floor(minRevenue * 0.9);
    const paddedMax = Math.ceil(maxRevenue * 1.1);

    return (
        <Card className="flex h-full flex-1 flex-col gap-6 border-none bg-white px-6 py-4 shadow-none outline-none">
            {/* Card header with title and mode toggle */}
            <CardHeader className="flex flex-row items-center justify-between border-none p-0">
                <CardTitle className="text-2xl font-semibold">{t("title")}</CardTitle>

                {/* Toggle to switch between monthly and weekly views */}
                <ToggleGroup
                    type="single"
                    value={mode}
                    onValueChange={(v) => v && setMode(v as "monthly" | "weekly")}
                    className="flex rounded-md bg-muted/40 p-1"
                >
                    <ToggleGroupItem
                        value="monthly"
                        className="rounded px-3 py-1.5 text-sm font-normal text-[#969696] hover:bg-transparent hover:text-[#969696] data-[state=on]:font-semibold data-[state=on]:text-maroon-600"
                    >
                        {t("monthly")}
                    </ToggleGroupItem>

                    <ToggleGroupItem
                        value="weekly"
                        className="rounded px-3 py-1.5 text-sm font-normal text-[#969696] hover:bg-transparent hover:text-[#969696] data-[state=on]:font-semibold data-[state=on]:text-maroon-600"
                    >
                        {t("weekly")}
                    </ToggleGroupItem>
                </ToggleGroup>
            </CardHeader>

            {/* Card content with the actual area chart */}
            <CardContent className="p-0">
                <ChartContainer config={chartConfig} className="h-[297px] w-full">
                    <AreaChart data={chartData}>
                        {/* Gradient fill for the area chart */}
                        <defs>
                            <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="20%" stopColor="#A6252A" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#A6252A" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>

                        {/* Grid lines */}
                        <CartesianGrid vertical={true} horizontal={false} stroke="#A1A1AA" strokeOpacity={0.6} />

                        {/* Y-axis with padded domain and formatted ticks */}
                        <YAxis
                            tickMargin={8}
                            tickLine={false}
                            axisLine={false}
                            domain={[paddedMin, paddedMax]}
                            tickFormatter={(value) => value.toLocaleString()}
                        />

                        {/* X-axis with formatted date labels */}
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const d = new Date(value);
                                return mode === "monthly"
                                    ? d.toLocaleDateString("en-US", { month: "short" })
                                    : d.toLocaleDateString("en-US", { day: "numeric" });
                            }}
                        />

                        {/* Tooltip on hover */}
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) =>
                                        new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })
                                    }
                                />
                            }
                        />

                        {/* The area chart itself */}
                        <Area type="basis" dataKey="revenue" stroke="#A6252A" fill="url(#revFill)" />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
