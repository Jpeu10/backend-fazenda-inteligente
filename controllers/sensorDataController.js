const prisma = require('../prisma/prismaClient');

async function saveSensorData(req, res) {
  const { tipo, valor, data_hora } = req.body;
  if (!tipo || valor === undefined) {
    return res.status(400).json({ error: 'Tipo e valor são obrigatórios' });
  }
  try {
    const sensorData = await prisma.sensorData.create({
      data: {
        tipo,
        valor,
        data_hora: data_hora ? new Date(data_hora) : new Date()
      }
    });
    res.json(sensorData);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar dados do sensor' });
  }
}

module.exports = { saveSensorData };
