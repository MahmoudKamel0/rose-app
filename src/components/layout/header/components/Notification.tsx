"use client";

import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

// import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "@/components/ui/button";
import { Bell, BrushCleaning, CheckCheck, EllipsisVertical, Trash2, Check, BellOff, Loader2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAllNotifications } from "@hooks/notifications/use-all-notifications.hook";
import { Notification } from "@lib/types/end-point-api/all-notifications";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMarkAllNotificationsAsRead } from "@/hooks/notifications/use-mark-all-notifications-as-read.hook";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteAllNotifications } from "@/hooks/notifications/use-delete-all-notifications.hook";
import { useMarkNotificationsAsRead } from "@/hooks/notifications/use-mark-notification-as-read.hook";
import { useDeleteSingleNotification } from "@/hooks/notifications/use-delete-single-notification";
import { Badge } from "@components/ui/badge";
import { cn } from "@lib/utils/cn.util";

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
    const allNotifications: Notification[] = data?.pages.flatMap((p) => p?.notifications ?? []) || [];

    // get unread notifications count
    const unReadCount = data?.pages[0]?.metadata.unreadCount || 0;

    return (
        <Popover>
            {/* Notification icon trigger */}
            <PopoverTrigger asChild>
                <button type="button" className="relative flex items-center justify-center hover:bg-transparent">
                    {unReadCount > 0 && (
                        <Badge
                            className={cn(
                                "absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center p-2 text-10 font-medium text-white",
                                "dark:bg-red-500 dark:text-zinc-50"
                            )}
                        >
                            {unReadCount}
                        </Badge>
                    )}

                    <Bell style={{ width: "24px", height: "24px" }} />
                </button>
            </PopoverTrigger>

            {/* Notification content popover */}
            <PopoverContent className="mr-10 w-96 max-w-none rounded-b-md border-0 bg-white p-0 dark:bg-zinc-800">
                {/* Header */}
                <div className="flex w-full flex-col items-center justify-center">
                    <div className="flex w-full items-center justify-between rounded-t-md border-b bg-maroon-700 p-3 dark:bg-softpink-200">
                        <h4 className="text-xl font-bold text-white dark:text-zinc-800">
                            Notifications ({data?.pages?.[0]?.metadata?.totalItems ?? allNotifications.length})
                        </h4>
                    </div>

                    {/* Header actions */}
                    <div className="flex w-full justify-between bg-white p-2.5 text-zinc-800 dark:bg-zinc-700">
                        <div className="flex w-full items-center justify-between">
                            {/* Clean All Button */}
                            <Button
                                variant={"ghost"}
                                type="button"
                                className="relative !flex flex-nowrap items-center justify-center gap-2"
                                onClick={() => deleteAll()}
                                disabled={allNotifications.length < 1 || isPendingData}
                            >
                                <BrushCleaning className="inline-block" style={{ width: 18, height: 18 }} color="gray" />
                                <span className="text-sm font-semibold text-zinc-800 dark:text-white">Clear all notifications</span>
                            </Button>

                            {/* Mark all as read button */}
                            <Button
                                variant={"ghost"}
                                type="button"
                                className="relative !flex flex-nowrap items-center justify-center gap-2"
                                onClick={() => markAllAsRead()}
                                disabled={allNotifications.length < 1 || unReadCount < 1 || isPendingData}
                            >
                                <CheckCheck className="inline-block" style={{ width: 18, height: 18 }} color="gray" />
                                <span className="text-sm font-semibold text-zinc-800 dark:text-white">Mark all as read</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Notification list using InfiniteScroll  */}

                {/* No notifications */}
                {allNotifications.length === 0 && !isPendingData ? (
                    <div className="flex h-56 flex-col items-center justify-center gap-4 rounded-b-md bg-white text-center dark:bg-zinc-900">
                        <BellOff style={{ width: 60, height: 60 }} color="gray" />
                        <p className="text-base font-medium text-zinc-500 dark:text-zinc-300">No notifications to display.</p>
                    </div>
                ) : isPendingData ? (
                    // Loading state
                    <div className="flex h-56 flex-col items-center justify-center gap-4 rounded-b-md bg-white text-center dark:bg-zinc-900">
                        <Loader2 className="h-10 w-10 animate-spin text-zinc-500" />
                        <p className="text-base font-medium text-zinc-500 dark:text-zinc-300">Loading notifications…</p>
                    </div>
                ) : (
                    // Notification list
                    <InfiniteScroll
                        loader={
                            <div className="flex items-center justify-center py-3">
                                <Loader2 className="h-5 w-5 animate-spin text-zinc-700" />
                            </div>
                        }
                        dataLength={allNotifications.length} // important: length of current items
                        next={() => fetchNextPage()} // called when scrolling needs next page
                        hasMore={!!hasNextPage}
                        height={500}
                        // small threshold so next loads slightly before reaching the bottom
                        scrollThreshold="100px"
                        className="h-fit bg-transparent"
                    >
                        <div className="divide-1 h-full divide-y divide-zinc-300 border-t-1 border-t-zinc-300 pb-12 dark:divide-zinc-600 dark:border-t-zinc-600">
                            {allNotifications.map((notification) => (
                                <div
                                    key={notification._id}
                                    className={`h-24 w-full p-4 text-left transition-colors hover:bg-accent ${
                                        notification.isRead ? "bg-zinc-200 dark:bg-zinc-800" : "bg-white dark:bg-zinc-900"
                                    }`}
                                >
                                    {/* Title + dropdown */}
                                    <div className={`mb-1.5 flex items-center justify-between`}>
                                        <p className={`text-base font-semibold text-zinc-800 dark:text-white`}>{notification.title}</p>

                                        {/* Dropdown for each notification */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button type="button" className={`flex items-center justify-center hover:bg-transparent`}>
                                                    <EllipsisVertical style={{ width: 20, height: 20 }} color="gray" />
                                                </button>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent
                                                align="end"
                                                className={`h-24 w-48 overflow-hidden border-0 bg-white dark:bg-zinc-700`}
                                            >
                                                {/* Mark as read */}
                                                <DropdownMenuItem className={`text-sm font-medium text-zinc-800 dark:text-white`}>
                                                    <Button
                                                        variant={"ghost"}
                                                        className={`!flex items-center justify-start gap-2`}
                                                        type="button"
                                                        onClick={() => markAsRead(notification._id, notification.isRead)}
                                                        disabled={notification.isRead}
                                                    >
                                                        <Check
                                                            className={`mr-2 text-sm font-semibold text-zinc-800 dark:text-zinc-50`}
                                                            style={{ width: 18, height: 18 }}
                                                            color="gray"
                                                        />
                                                        <span className={`text-sm font-semibold text-zinc-800 dark:text-zinc-50`}>
                                                            Mark as read
                                                        </span>
                                                    </Button>
                                                </DropdownMenuItem>

                                                <DropdownMenuSeparator />

                                                {/* Delete notification */}
                                                <DropdownMenuItem className={`text-sm font-medium text-zinc-800 dark:text-white`}>
                                                    <Button
                                                        className={`!flex items-center justify-start gap-2`}
                                                        type="button"
                                                        onClick={() => deleteSingle(notification._id)}
                                                        variant={"ghost"}
                                                        disabled={isDeletingSingle}
                                                    >
                                                        <Trash2 className={`mr-2`} style={{ width: 18, height: 18 }} color="red" />
                                                        <span className={`text-sm font-semibold text-zinc-800 dark:text-zinc-50`}>
                                                            Delete notification
                                                        </span>
                                                    </Button>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Notification body */}
                                    <p className={`line-clamp-2 text-sm font-normal leading-snug text-zinc-400`}>{notification.body}</p>
                                </div>
                            ))}
                            {/* Footer hint: show scroll hint if more pages, otherwise end of list */}
                            <div className={`py-1 text-center text-sm text-zinc-500 dark:text-white`}>
                                {hasNextPage ? "Scroll to view more" : "End of the list"}
                            </div>
                        </div>
                    </InfiniteScroll>
                )}
            </PopoverContent>
        </Popover>
    );
}
