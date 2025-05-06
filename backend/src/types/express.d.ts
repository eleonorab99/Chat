import { Express } from 'express';

// Estende i tipi di Express
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}