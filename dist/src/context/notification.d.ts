import { Article } from "../resolvers/types";
export declare function createTransport(): {
    send: (mailOptions?: any) => Promise<any>;
};
export declare function sendPublicationNotifications(subject: string, articles?: Article[]): Promise<any>;
