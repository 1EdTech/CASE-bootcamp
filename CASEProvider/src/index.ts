import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'CASE Provider v1.1' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'CASE Provider v1.1',
    specification: 'https://purl.imsglobal.org/spec/case/v1p1',
  });
});

app.listen(PORT, () => {
  console.log(`CASE Provider v1.1 running on port ${PORT}`);
});
