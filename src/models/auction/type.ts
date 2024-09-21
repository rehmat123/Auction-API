export interface Auction {
    id: string;
    title: string;
    endTime: string;
    highestBid: number;
    winnerId: number | null;
    bids: bids[];
    status: boolean;
}
type bids = {
    userId: number;
    amount: number;
    createdAt: string;
}

export type Auctions = Auction[];
