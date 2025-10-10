"use client";

import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

// import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "@/components/ui/button";
import { Bell, BrushCleaning, CheckCheck, EllipsisVertical, Trash2, Check, BellOff, Loader2 } from "lucide-react";
import { cn } from "@lib/utils/cn.utils";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAllNotifications } from "@lib/hooks/use-all-notifications.hook";
import { Notification } from "@lib/types/all-notifications";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMarkAllNotificationsAsRead } from "@lib/hooks/use-mark-all-notifications-as-read.hook";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteAllNotifications } from "@lib/hooks/use-delete-all-notifications.hook";
import { useMarkNotificationsAsRead } from "@lib/hooks/use-mark-notification-as-read.hook";
import { useDeleteSingleNotification } from "@lib/hooks/use-delete-single-notification";

// Header action type

export default function NotificationMenu() {
    // Fetching paginated notifications

    // Header actions declared inline (not in state)

    // Get all notifications for this user
    const { data, fetchNextPage, hasNextPage, isPending: isPendingData } = useAllNotifications();

    // Mark all as read mutation hook
    const { mutateAsync: mutateReadAll } = useMarkAllNotificationsAsRead();

    // Delete all as read mutation hook
    const { mutateAsync: mutateDeleteAll } = useDeleteAllNotifications();

    // Mark all notifications as read hook
    const { mutateAsync: mutateMarkSingleAsRead } = useMarkNotificationsAsRead();

    // Delete single notification hook
    const { mutateAsync: mutateDeleteSingleNotification, isPending: isDeletingSingle } = useDeleteSingleNotification();

    // React Query client for invalidation
    const queryClient = useQueryClient();

    // Mark all as read handler
    const markAllAsRead = async () => {
        const res = await mutateReadAll();
        // simple revalidation: invalidate all queries whose key starts with `all-notifications`
        await queryClient.invalidateQueries({
            predicate: (query) =>
                Array.isArray(query.queryKey) && typeof query.queryKey[0] === "string" && query.queryKey[0].startsWith("all-notifications"),
        });
        return res;
    };

    // Delete all notifications mutation
    const deleteAll = async () => {
        const res = await mutateDeleteAll();
        await queryClient.invalidateQueries({
            predicate: (query) =>
                Array.isArray(query.queryKey) && typeof query.queryKey[0] === "string" && query.queryKey[0].startsWith("all-notifications"),
        });
        return res;
    };

    // Mark notification as read
    const markAsRead = async (id: string, isRead: boolean) => {
        if (isRead) return;
        const res = await mutateMarkSingleAsRead({ notificationIds: [id] });
        await queryClient.invalidateQueries({
            predicate: (query) =>
                Array.isArray(query.queryKey) && typeof query.queryKey[0] === "string" && query.queryKey[0].startsWith("all-notifications"),
        });
        return res;
    };

    // Delete single notification
    const deleteSingle = async (id: string) => {
        const res = await mutateDeleteSingleNotification(id);
        await queryClient.invalidateQueries({
            predicate: (query) =>
                Array.isArray(query.queryKey) && typeof query.queryKey[0] === "string" && query.queryKey[0].startsWith("all-notifications"),
        });
        return res;
    };

    // Variables

    // Flatten pages into a single list
    const allNotifications: Notification[] = data?.pages.flatMap((p) => p.data?.notifications ?? []) || [];

    // get unread notifications count
    const unReadCount = data?.pages[0].data?.metadata.unreadCount || 0;

    return (
        <Popover>
            {/* Notification icon trigger */}
            <PopoverTrigger asChild>
                <Button variant="ghost" className={cn("relative flex items-center justify-center hover:bg-transparent")}>
                    {unReadCount > 0 && (
                        <div
                            className={cn(
                                "absolute top-1 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-white"
                            )}
                        >
                            {unReadCount}
                        </div>
                    )}

                    <Bell className={cn()} style={{ width: "24px", height: "24px" }} />
                </Button>
            </PopoverTrigger>

            {/* Notification content popover */}
            <PopoverContent className={cn("mr-10 w-96 max-w-none rounded-b-md border-0 bg-white p-0 dark:bg-zinc-800")}>
                {/* Header */}
                <div className={cn("flex w-full flex-col items-center justify-center")}>
                    <div
                        className={cn(
                            "flex w-full items-center justify-between rounded-t-md border-b p-3",
                            "bg-maroon-700 dark:bg-softpink-200"
                        )}
                    >
                        <h4 className={cn("text-xl font-bold text-white dark:text-zinc-800")}>
                            Notifications ({data?.pages?.[0]?.data?.metadata?.totalItems ?? allNotifications.length})
                        </h4>
                    </div>

                    {/* Header actions */}
                    <div className={cn("flex w-full justify-between bg-white p-2.5 text-zinc-800 dark:bg-zinc-700")}>
                        <div className={cn("flex w-full items-center justify-between")}>
                            {/* Clean All Button */}
                            <Button
                                variant={"ghost"}
                                type="button"
                                className={cn("relative !flex flex-nowrap items-center justify-center gap-2")}
                                onClick={() => deleteAll()}
                                disabled={allNotifications.length < 1 || isPendingData}
                            >
                                <BrushCleaning className={cn("inline-block")} style={{ width: 18, height: 18 }} color="gray" />
                                <span className={cn("text-sm font-semibold text-zinc-800 dark:text-white")}>Clear all notifications</span>
                            </Button>

                            {/* Mark all as read button */}
                            <Button
                                variant={"ghost"}
                                type="button"
                                className={cn("relative !flex flex-nowrap items-center justify-center gap-2")}
                                onClick={() => markAllAsRead()}
                                disabled={allNotifications.length < 1 || unReadCount < 1 || isPendingData}
                            >
                                <CheckCheck className={cn("inline-block")} style={{ width: 18, height: 18 }} color="gray" />
                                <span className={cn("text-sm font-semibold text-zinc-800 dark:text-white")}>Mark all as read</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Notification list using InfiniteScroll  */}

                {/* No notifications */}
                {allNotifications.length === 0 && !isPendingData ? (
                    <div
                        className={cn(
                            "flex h-56 flex-col items-center justify-center gap-4 rounded-b-md bg-white text-center dark:bg-zinc-900"
                        )}
                    >
                        <BellOff className={cn("")} style={{ width: 60, height: 60 }} color="gray" />
                        <p className={cn("text-base font-medium text-zinc-500 dark:text-zinc-300")}>No notifications to display.</p>
                    </div>
                ) : isPendingData ? (
                    // Loading state
                    <div
                        className={cn(
                            "flex h-56 flex-col items-center justify-center gap-4 rounded-b-md bg-white text-center dark:bg-zinc-900"
                        )}
                    >
                        <Loader2 className={cn("h-10 w-10 animate-spin text-zinc-500")} />
                        <p className={cn("text-base font-medium text-zinc-500 dark:text-zinc-300")}>Loading notifications…</p>
                    </div>
                ) : (
                    // Notification list
                    <InfiniteScroll
                        loader={
                            <div className={cn("flex items-center justify-center py-3")}>
                                <Loader2 className={cn("h-5 w-5 animate-spin text-zinc-500")} />
                            </div>
                        }
                        dataLength={allNotifications.length} // important: length of current items
                        next={() => fetchNextPage()} // called when scrolling needs next page
                        hasMore={!!hasNextPage}
                        height={500}
                        // small threshold so next loads slightly before reaching the bottom
                        scrollThreshold="100px"
                        className={cn("h-fit bg-transparent")}
                    >
                        <div
                            className={cn(
                                "divide-1 divide-y divide-zinc-300 border-t-1 border-t-zinc-300 pb-12 dark:divide-zinc-600 dark:border-t-zinc-600"
                            )}
                        >
                            {allNotifications.map((notification) => (
                                <div
                                    key={notification._id}
                                    className={cn(
                                        `hover:bg-accent h-24 w-full p-4 text-left transition-colors ${
                                            notification.isRead ? "bg-zinc-200 dark:bg-zinc-800" : "bg-white dark:bg-zinc-900"
                                        }`
                                    )}
                                >
                                    {/* Title + dropdown */}
                                    <div className={cn("mb-1.5 flex items-center justify-between")}>
                                        <p className={cn("text-base font-semibold text-zinc-800 dark:text-white")}>{notification.title}</p>

                                        {/* Dropdown for each notification */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    type="button"
                                                    variant={"ghost"}
                                                    size={"icon"}
                                                    className={cn("flex items-center justify-center hover:bg-transparent")}
                                                >
                                                    <EllipsisVertical className={cn("")} style={{ width: 20, height: 20 }} color="gray" />
                                                </Button>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent
                                                align="end"
                                                className={cn("h-24 w-48 overflow-hidden border-0 bg-white dark:bg-zinc-700")}
                                            >
                                                {/* Mark as read */}
                                                <DropdownMenuItem className={cn("text-sm font-medium text-zinc-800 dark:text-white")}>
                                                    <Button
                                                        variant={"ghost"}
                                                        size={"xs"}
                                                        className={cn("!flex items-center justify-start gap-2")}
                                                        type="button"
                                                        onClick={() => markAsRead(notification._id, notification.isRead)}
                                                        disabled={notification.isRead}
                                                    >
                                                        <Check
                                                            className={cn("mr-2 text-sm font-semibold text-zinc-800 dark:text-zinc-50")}
                                                            style={{ width: 18, height: 18 }}
                                                            color="gray"
                                                        />
                                                        <span className={cn("text-sm font-semibold text-zinc-800 dark:text-zinc-50")}>
                                                            Mark as read
                                                        </span>
                                                    </Button>
                                                </DropdownMenuItem>

                                                <DropdownMenuSeparator />

                                                {/* Delete notification */}
                                                <DropdownMenuItem className={cn("text-sm font-medium text-zinc-800 dark:text-white")}>
                                                    <Button
                                                        className={cn("!flex items-center justify-start gap-2")}
                                                        type="button"
                                                        onClick={() => deleteSingle(notification._id)}
                                                        variant={"ghost"}
                                                        size={"xs"}
                                                        disabled={isDeletingSingle}
                                                    >
                                                        <Trash2 className={cn("mr-2")} style={{ width: 18, height: 18 }} color="red" />
                                                        <span className={cn("text-sm font-semibold text-zinc-800 dark:text-zinc-50")}>
                                                            Delete notification
                                                        </span>
                                                    </Button>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Notification body */}
                                    <p className={cn("line-clamp-2 text-sm leading-snug font-normal text-zinc-400")}>{notification.body}</p>
                                </div>
                            ))}
                            {/* Footer hint: show scroll hint if more pages, otherwise end of list */}
                            <div className={cn("pt-4 text-center text-sm text-zinc-500 dark:text-zinc-300")}>
                                {hasNextPage ? "Scroll to view more" : "End of the list"}
                            </div>
                        </div>
                    </InfiniteScroll>
                )}
            </PopoverContent>
        </Popover>
    );
}
