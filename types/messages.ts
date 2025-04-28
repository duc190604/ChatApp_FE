export interface Message {
    id: string;
    content: string;
    sender: {
        id: string;
        username: string;
        avatar: string;
    };
    chat: string;
    createdAt: Date;
    updatedAt: Date;
    type: "text" | "image" | "audio" | "video" | "file";
    status: "sent" | "delivered" | "seen";
    isRevoked: boolean;
    isUpdated: boolean;
}

