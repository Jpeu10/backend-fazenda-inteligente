const prisma = require('../prisma/prismaClient');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function uploadImage(req, res) {
  if (!req.file) return res.status(400).json({ error: 'Arquivo de imagem é obrigatório' });

  try {
    const imagePath = path.resolve(req.file.path);
    const imageBuffer = fs.readFileSync(imagePath);

    const aiResponse = await axios.post(process.env.AI_API_URL, imageBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Authorization': `Bearer ${process.env.AI_API_KEY}`
      }
    });

    const resultado = aiResponse.data;

    if (resultado.anomalia) {
      const mission = await prisma.mission.create({
        data: {
          data: new Date(),
          status: 'em andamento',
          drone_id: 'drone-1'
        }
      });

      const imageRecord = await prisma.image.create({
        data: {
          mission_id: mission.id,
          url: req.file.path,
          resultado_processamento: JSON.stringify(resultado),
          gps_lat: resultado.gps_lat || null,
          gps_long: resultado.gps_long || null
        }
      });

      res.json({ message: 'Imagem processada e salva', image: imageRecord });
    } else {
      fs.unlinkSync(imagePath);
      res.json({ message: 'Imagem processada sem anomalias, não salva' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar imagem', details: error.message });
  }
}

module.exports = { uploadImage };
