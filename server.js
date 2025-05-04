require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const authRoutes = require('./routes/auth');
const imageRoutes = require('./routes/images');
const missionRoutes = require('./routes/missions');
const sensorDataRoutes = require('./routes/sensorData');
const plantRoutes = require('./routes/plants');
const exportRoutes = require('./routes/export');

// Middleware para parsear JSON
app.use(express.json());

// Usar rotas modulares
app.use(authRoutes);
app.use(imageRoutes);
app.use(missionRoutes);
app.use(sensorDataRoutes);
app.use(plantRoutes);
app.use(exportRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
