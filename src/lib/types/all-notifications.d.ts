type Metadata = {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
    nextPage: number;
    unreadCount: number;
};

type Notification = {
    type: string;
    priority: string;
    isRead: boolean;
    _id: string;
    title: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};
export type AllNotificationsResponse = {
    data: {
        notifications: Notification[];
        metadata: Metadata;
    };
};
