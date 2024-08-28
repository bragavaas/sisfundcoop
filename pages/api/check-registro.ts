import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  if (req.method === 'GET') {
    const { matricula, campanhaId } = req.query;

    if (!matricula || !campanhaId) {
      return res.status(400).json({ error: 'Matrícula and Campanha ID are required' });
    }

    try {
      // Query to find any Registro with the given matricula and campanhaId
      const existingRegistro = await prisma.registro.findFirst({
        where: {
          matriculaDoParticipante: matricula.toString(),
          campanhaId: Number(campanhaId),
        },
      });

      if (existingRegistro) {
        return res.status(200).json({
          participante_ja_retirou: true,
        });
      } else {
        return res.status(200).json({
            participante_ja_retirou: false,
        });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}