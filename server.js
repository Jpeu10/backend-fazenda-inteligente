require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const exportRoutes = require('./routes/export');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/export', exportRoutes);

app.get('/', (req, res) => {
  res.send('Servidor Fazenda Inteligente rodando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
