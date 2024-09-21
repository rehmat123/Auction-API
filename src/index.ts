import express from 'express';
import basicAuth from './middlewares/basicAuthMiddleware';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import auctionRoutes from './routes/auction';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(basicAuth);


app.use('/auctions', auctionRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});