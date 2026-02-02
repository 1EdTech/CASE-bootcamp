// Middleware to strip out null fields from all JSON responses in Express
import { Request, Response, NextFunction } from 'express';

function removeNulls(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(removeNulls);
  } else if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([_, v]) => v !== null)
        .map(([k, v]) => [k, removeNulls(v)])
    );
  }
  return obj;
}

export function nullValueCleanup(req: Request, res: Response, next: NextFunction) {
  const originalJson = res.json;
  res.json = function (data: any) {
    return originalJson.call(this, removeNulls(data));
  };
  next();
}
