const prisma = require('../prisma/prismaClient');

async function getPlants(req, res) {
  try {
    const plants = await prisma.plant.findMany();
    res.json(plants);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar plantas' });
  }
}

async function getPlantById(req, res) {
  const id = parseInt(req.params.id);
  try {
    const plant = await prisma.plant.findUnique({
      where: { id },
      include: { alerts: true }
    });
    if (!plant) return res.status(404).json({ error: 'Planta não encontrada' });
    res.json(plant);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar planta' });
  }
}

module.exports = { getPlants, getPlantById };
