import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { uploadRouter } from './routes/upload';
import { nullValueCleanup } from './middlewares/json';
import { BASE_PATH } from './routes/constants';
import { associationsRouter } from './routes/associations';
import { definitionsRouter } from './routes/definitions';
import { documentsRouter } from './routes/documents';
import { itemsRouter } from './routes/items';
import { packagesRouter } from './routes/packages';
import { rubricsRouter } from './routes/rubrics';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(nullValueCleanup);

// Mount routers
app.use("/", uploadRouter);
app.use(BASE_PATH, associationsRouter);
app.use(BASE_PATH, definitionsRouter);
app.use(BASE_PATH, documentsRouter);
app.use(BASE_PATH, itemsRouter);
app.use(BASE_PATH, packagesRouter);
app.use(BASE_PATH, rubricsRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'CASE Provider v1.1' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'CASE Provider v1.1',
    specification: 'https://www.imsglobal.org/spec/case/v1p1',
  });
});

app.listen(PORT, () => {
  console.log(`CASE Provider v1.1 running on port ${PORT}`);
});
