import express from 'express';
import { calculateWinner, create, getAuctionById, placeBid } from '../controllers/auctionController';
import checkPermissionsMiddleware from '../middlewares/checkPermissionMiddleware';

const router = express.Router();
const employeePermissions = ['create_auction'];
const bidPermission = ['bid'];

router.post('/',  checkPermissionsMiddleware(employeePermissions), create);
router.post('/:id/bid', checkPermissionsMiddleware(bidPermission), placeBid);
router.get('/:id', getAuctionById);
router.get('/:id/calculate/winner/', calculateWinner);
export default router;