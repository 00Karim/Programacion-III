const express = require('express');
const router = express.Router();
const gastosRoutes = require('./gastos.routes')
const ingresosRoutes = require('./ingresos.routes')
const usuariosRoutes = require('./usuarios.routes')

// Ruta de prueba
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ruta de ejemplo
router.get('/test', (req, res) => {
  res.json({
    message: 'Endpoint de prueba',
    data: {
      backend: 'Express',
      database: 'PostgreSQL',
      orm: 'Sequelize'
    }
  });
});

router.use('/gastos', gastosRoutes)

router.use('/ingresos', ingresosRoutes)

router.use('/usuarios', usuariosRoutes)

module.exports = router;
