console.log('=== Starting Audio Converter API ===');
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import convertRouter from './routes/convert';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir archivos convertidos como estáticos (opcional para links temporales)
app.use('/converted', express.static(path.join(__dirname, '../converted')));

app.get('/', (_req, res) => {
  res.send('Audio Converter API');
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/convert', convertRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
