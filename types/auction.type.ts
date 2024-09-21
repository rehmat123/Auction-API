interface Auction {
    id: string;
    title: string;
    endTime: string;
    highestBid: number;
    highestBidder: string | null;
}
interface Bid {
    auctionId: string;
    bidder: string;
    amount: number;
}