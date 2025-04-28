import { Message } from "./messages";

export interface Chat {
    id: string;
    name: string;
    lastMessage: Message;
    avatar: string;
    members: string[];
    isOnline: boolean;
}
