import express from 'express';
import { getPersonas } from '../controllers/personaController.js';

const ruta = express.Router();

ruta.get('/personas', getPersonas);

export default ruta;
