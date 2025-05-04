const PDFDocument = require('pdfkit');
const getStream = require('get-stream');

async function generatePDF(plants) {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  doc.fontSize(18).text('Relatório de Plantas Afetadas', { align: 'center' });
  doc.moveDown();

  // Quantidade de problemas por tipo
  const problemasCount = {};
  plants.forEach(plant => {
    if (plant.tipo_problema) {
      problemasCount[plant.tipo_problema] = (problemasCount[plant.tipo_problema] || 0) + 1;
    }
  });

  doc.fontSize(14).text('Quantidade de Problemas por Tipo:');
  Object.entries(problemasCount).forEach(([tipo, count]) => {
    doc.text(`${tipo}: ${count}`);
  });
  doc.moveDown();

  // Listagem de plantas afetadas
  doc.fontSize(14).text('Listagem de Plantas Afetadas:');
  plants.forEach(plant => {
    if (plant.tipo_problema) {
      doc.text(`ID: ${plant.id} - Localização: ${plant.localizacao} - Problema: ${plant.tipo_problema} - Status: ${plant.status_saude}`);
    }
  });

  // TODO: Adicionar gráficos se possível (pdfkit não tem suporte nativo, pode usar imagens externas)

  doc.end();

  const pdfBuffer = await getStream.buffer(doc);
  return pdfBuffer;
}

module.exports = { generatePDF };
