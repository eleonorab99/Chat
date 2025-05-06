import express from 'express';
import dotenv from 'dotenv';
import { configureCors } from './middleware/authMiddleware';


// Carica le variabili d'ambiente
dotenv.config();

// Inizializza l'app Express
const app = express();
const PORT = process.env.PORT || 8080;

// Configura middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura CORS
configureCors(app);



// Root route
app.get('/api', (req, res) => {
  res.json({ message: 'API Chat funzionante' });
});

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});

export default app;