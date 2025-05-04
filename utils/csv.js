const { Parser } = require('json2csv');

function generateCSV(plants) {
  const fields = ['id', 'localizacao', 'status_saude', 'tipo_problema'];
  const opts = { fields };

  try {
    const parser = new Parser(opts);
    const csv = parser.parse(plants);
    return csv;
  } catch (err) {
    throw new Error('Erro ao gerar CSV');
  }
}

module.exports = { generateCSV };
