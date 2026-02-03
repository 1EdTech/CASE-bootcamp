import { Request, Response, NextFunction } from 'express';
import { errors } from './errors';

/**
 * UUID v4 regex pattern.
 */
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Checks if a string is a valid UUID.
 */
export const isValidUUID = (value: string): boolean => {
  return UUID_REGEX.test(value);
};

/**
 * Middleware that validates the sourcedId parameter is a valid UUID.
 * Returns 404 error if invalid.
 */
export const validateSourcedId = (req: Request, res: Response, next: NextFunction) => {
  const { sourcedId } = req.params;
  
  if (!sourcedId || !isValidUUID(sourcedId)) {
    return errors.notFound(res);
  }
  
  next();
};
