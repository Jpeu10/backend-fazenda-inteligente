const { generatePDF } = require('../utils/pdf');
const { generateCSV } = require('../utils/csv');
const prisma = require('../prisma/prismaClient');

async function exportPDF(req, res) {
  try {
    const plants = await prisma.plant.findMany({
      include: { alerts: true }
    });
    const pdfBuffer = await generatePDF(plants);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar PDF' });
  }
}

async function exportCSV(req, res) {
  try {
    const plants = await prisma.plant.findMany({
      include: { alerts: true }
    });
    const csv = generateCSV(plants);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar CSV' });
  }
}

module.exports = { exportPDF, exportCSV };
