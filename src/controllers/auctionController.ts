import { Request, Response } from 'express';
import { auctions } from '../models/auction/auction';
import { users } from '../models/user/user';
import { createAuction, sortingBids } from '../services/auction';

export const create = (req: Request, res: Response) => {
    const { title, endTime } = req.body;
    console.log(title, endTime)

    if (!title || !endTime) {
        return res.status(400).json({ message: 'Title and endTime are required' });
    }
    const id = createAuction(title, endTime);
    res.status(201).json({ id });
};

export const placeBid = (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        const { value } = req.body;
        // Validate input and update the auction

        if (!id) {
            return res.status(400).json({ message: 'Auction ID is required' });
        }

        if (!value) {
            return res.status(400).json({ message: 'Bid value is required' });
        }

        // Check if the auction exists
        const auction = auctions.find(auction => auction.id === id);
        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }

        // Check if the bid amount is valid
        if (typeof value !== 'number') {

            return res.status(400).json({ message: 'Invalid bid amount' });
        }
        // check if current time is less than auction end time
        if (new Date(auction.endTime).getTime() < new Date().getTime()) {
            return res.status(400).json({ message: 'Auction has ended' });
        }

        // store bid
        auction.bids.push({
            userId: res.locals.user.id,
            amount: value,
            createdAt: new Date().toISOString()
        });

        res.send('Bid placed successfully');
    }
    catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
};

export const getAuctionById = (req: Request, res: Response) => {
    // Implement logic to get details of an auction by ID
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Auction ID is required' });
    }
    const auction = auctions.find(auction => auction.id === id);
    if (!auction) {
        return res.status(404).json({ error: 'Auction not found' });
    }
    res.status(200).json({
        id: auction.id,
        title: auction.title,
        endTime: auction.endTime,
        winnerUsername: users.find(user => user.id === auction.winnerId)?.username || null,
    });
};

// it will be called using rabbiqmq consumer to decoupled the load. But currently it is not implemented and used as REST API.
export const calculateWinner = (req: Request, res: Response) => {

    const { id } = req.params;
    if(!id){
        return res.status(400).json({ message: 'Auction ID is required' });
    }

    const auction = auctions.find(auction => auction.id === id);
    if (!auction) {
        return res.status(404).json({ error: 'Auction not found' });
    }
    if (!auction || !auction.bids || auction.bids.length === 0) {
        return res.status(404).json({ error: 'No Bids place for this auction' });
    }

    // Sort bids in descending order based on amount
    const sortedBids = sortingBids(auction);

    auction.highestBid = sortedBids[0].amount;
    auction.winnerId = sortedBids[0].userId;

    return res.send("The winner is with bid amount " + auction.highestBid);
};
