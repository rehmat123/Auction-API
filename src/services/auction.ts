import { v4 as uuidv4 } from 'uuid';
import { Auction } from '../models/auction/type';
import { auctions } from '../models/auction/auction';


export const createAuction = (title: string, endTime: string) => {
    try {
        const id = uuidv4();
        const newAuction: Auction = {
            id,
            title,
            endTime,
            highestBid: 0,
            winnerId: null,
            bids: [],
            status: true,
        };
        auctions.push(newAuction);
        return id;
    }
    catch (error) {
        throw new Error('Failed to create auction');
    }
};

export const sortingBids = (auction: Auction) => {
    const sortedBids = auction.bids.sort((a, b) => {
        if (b.amount !== a.amount) {
            return b.amount - a.amount; // Sort by bid amount in descending order
        } else {
            const createdAtA = new Date(a.createdAt);
            const createdAtB = new Date(b.createdAt);
            return createdAtA.getTime() - createdAtB.getTime(); // Sort by createdAt time in ascending order
        }
    });
    return sortedBids;

}