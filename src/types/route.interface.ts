import { HttpMethod } from './http.enum.js';
import { NextFunction, Request, Response } from 'express';

export interface RouteInterface {
  path: string;
  method: HttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => void;
}
