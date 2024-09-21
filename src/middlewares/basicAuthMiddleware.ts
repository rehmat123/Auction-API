import { Request, Response, NextFunction } from 'express';
import { users } from '../models/user/user';
import bcrypt from 'bcryptjs';

const basicAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).send('Unauthorized');
}

const base64Credentials = authHeader.split(' ')[1];
const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
const [username, password] = credentials.split(':');

    const user = users.find(u=> u.username === username && bcrypt.compareSync(password, process.env.PASSWORD!));

    if (!user) {
        return res.status(401).send('Unauthorized');
    }
    res.locals.user = user;
    next();
  

};

export default basicAuth;
