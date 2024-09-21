import { User } from "./type";

export const users: User[] = [
    { id: 1, username: "employee", password: "somehashpassword", permissions: ["create_auction", "view_auction"] },
    { id: 2, username: "bidder1", password: "somehashpassword", permissions: ["bid", "view_auction"] },
    { id: 3, username: "bidder2", password: "somehashpassword", permissions: ["bid", "view_auction"] },
    { id: 4, username: "bidder3", password: "somehashpassword", permissions: ["bid", "view_auction"] }
];
