import express from 'express';
import cors from 'cors';
import personaRoutes from './routes/personaRoutes.js';

const app = express();

app.use(cors());
app.use('/api', personaRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
