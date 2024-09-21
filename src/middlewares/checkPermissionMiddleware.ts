import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user/type';

const checkPermissionsMiddleware = (allowedPermissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;

    console.log(allowedPermissions);
    
    if (!user || !user.permissions) {
      return res.status(403).json({ message: 'Access Forbidden. You do not have sufficient permissions.' });
    }

    const hasPermission = allowedPermissions.every(permission => user.permissions.includes(permission));

    if (!hasPermission) {
      return res.status(403).json({ message: 'Access Forbidden. You do not have sufficient permissions.' });
    }

    // If user has necessary permissions, proceed to the next middleware/route handler
    next();
  };
};

export default checkPermissionsMiddleware;
