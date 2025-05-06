import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import express from 'express';

// Middleware di autenticazione
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'Autenticazione richiesta' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'your_jwt_secret';
    const decoded = jwt.verify(token, secret) as { userId: number };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token non valido' });
  }
};

// Configurazione CORS
export const configureCors = (app: express.Application) => {
  app.use(cors({
    origin: 'http://localhost:5173', // URL del frontend Vite
    credentials: true
  }));
};

export default {
  authenticate,
  configureCors
};