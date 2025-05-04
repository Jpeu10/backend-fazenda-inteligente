const prisma = require('../prisma/prismaClient');

async function getMissions(req, res) {
  try {
    const missions = await prisma.mission.findMany();
    res.json(missions);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar missões' });
  }
}

module.exports = { getMissions };
