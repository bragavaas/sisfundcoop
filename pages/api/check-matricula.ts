import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  if (req.method === 'GET') {
    const { nomeDoParticipante, campanhaId } = req.query;

    if (!nomeDoParticipante || !campanhaId) {
      return res.status(400).json({ error: 'Matrícula and Campanha ID are required' });
    }

    try {
      // Query to find any Registro with the given matricula and campanhaId
      const existingParticipante = await prisma.participante.findFirst({
        where: {
          nome: nomeDoParticipante.toString(),
          campanhaId: Number(campanhaId),
        },
      });
      console.log(existingParticipante);
      if (existingParticipante) {
        return res.status(200).json({
          matricula_participante: existingParticipante.matricula,
        });
      } else {
        return res.status(200).json({
            matricula_participante: null,
        });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}