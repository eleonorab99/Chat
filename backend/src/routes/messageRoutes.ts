import express, { Request, Response } from 'express';
import { authenticate } from '../middleware/authMiddleware';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Proteggi tutte le route dei messaggi con autenticazione
router.use(authenticate);

// Get direct messages with a specific user
router.get('/direct/:userId', (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const currentUserId = req.userId;
  
  // Implementare la logica per ottenere i messaggi diretti
  // Per ora, restituiamo una risposta simulata
  res.json([
    {
      id: 1,
      senderId: currentUserId,
      receiverId: userId,
      content: 'Ciao, come stai?',
      timestamp: new Date().toISOString(),
      read: true
    },
    {
      id: 2,
      senderId: userId,
      receiverId: currentUserId,
      content: 'Tutto bene, grazie!',
      timestamp: new Date().toISOString(),
      read: false
    }
  ]);
});

// Send a direct message
router.post('/direct', (req: Request, res: Response) => {
  const { receiverId, content } = req.body;
  const senderId = req.userId;
  
  // Implementare la logica per inviare un messaggio diretto
  // Per ora, restituiamo una risposta simulata
  res.status(201).json({
    id: 3,
    senderId: senderId,
    receiverId: receiverId,
    content: content,
    timestamp: new Date().toISOString(),
    read: false
  });
});

// Upload a file in direct messages
router.post('/direct/upload', upload.single('file'), (req: Request & { file?: Express.Multer.File }, res: Response) => {
  const file = req.file;
  const receiverId = parseInt(req.body.receiverId);
  const senderId = req.userId;
  
  // Implementare la logica per caricare un file in un messaggio diretto
  // Per ora, restituiamo una risposta simulata
  res.status(201).json({
    id: 4,
    senderId: senderId,
    receiverId: receiverId,
    content: `File: ${file?.originalname || 'unknown'}`,
    fileUrl: `/uploads/${file?.filename || 'nofile'}`,
    timestamp: new Date().toISOString(),
    read: false
  });
});

export default router;