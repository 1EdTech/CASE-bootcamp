import { Router } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';

const router = Router();

router.get('/openapi.json', (req, res) => {
  try {
    const specPath = join(process.cwd(), 'public', 'openapi-spec.json');
    const spec = JSON.parse(readFileSync(specPath, 'utf-8'));
    res.json(spec);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load OpenAPI specification' });
  }
});

export { router as specRouter };
