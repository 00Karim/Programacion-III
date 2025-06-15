import personas from '../models/personaModel.js';

export const getPersonas = (req, res) => {
  res.json(personas);
};
