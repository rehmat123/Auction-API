

import { auctions } from '../models/auction/auction';
import { Auction } from '../models/auction/type';
import { createAuction, sortingBids } from './auction';

jest.mock('../models/auction/auction.ts', () => ({
    auctions: [],
}));

describe('Auction Controller', () => {
    describe('createAuction', () => {
        it('should create a new auction', () => {
            const title = 'Test Auction';
            const endTime = '2024-05-25T00:00:00.000Z';
            const auctionId = createAuction(title, endTime);

            expect(auctionId).toBeTruthy(); 
            expect(auctions.length).toBe(1); 
            expect(auctions[0].id).toBe(auctionId); 
            expect(auctions[0].title).toBe(title); 
            expect(auctions[0].endTime).toBe(endTime);
        });

    });

    describe('sortingBids', () => {
        it('should sort bids correctly', () => {
            const auction: Auction = {
                id: '1',
                title: 'Test Auction',
                endTime: '2024-05-25T00:00:00.000Z',
                highestBid: 0,
                winnerId: null,
                bids: [
                    { userId: 1, amount: 100, createdAt: '2024-05-24T12:00:00.000Z' },
                    { userId: 2, amount: 150, createdAt: '2024-05-24T11:00:00.000Z' },
                    { userId: 3, amount: 150, createdAt: '2024-05-24T13:00:00.000Z' },
                    { userId: 4, amount: 88, createdAt: '2024-05-24T14:00:00.000Z' },
                ],
                status: true,
            };

            const sortedBids = sortingBids(auction);
            console.log(sortedBids)

            // Expect the bids to be sorted in descending order based on amount
            expect(sortedBids[0].amount).toBe(150); // Highest bid
            expect(sortedBids[1].amount).toBe(150);
            expect(sortedBids[2].amount).toBe(100);
            expect(sortedBids[3].amount).toBe(88); // Lowest bid

            // Expect the bids to be sorted in ascending order based on createdAt time in case of a tie in amount
            expect(sortedBids[0].createdAt).toBe('2024-05-24T11:00:00.000Z'); // Earliest createdAt time
            expect(sortedBids[1].createdAt).toBe('2024-05-24T13:00:00.000Z'); // // latest createdAt time
            expect(sortedBids[2].createdAt).toBe('2024-05-24T12:00:00.000Z');
            expect(sortedBids[3].createdAt).toBe('2024-05-24T14:00:00.000Z'); 
        });
    });

});
