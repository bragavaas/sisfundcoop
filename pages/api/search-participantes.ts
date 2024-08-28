import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();

  if (req.method === 'POST') {
    try {
      const participantes = req.body;

      if (!Array.isArray(participantes)) {
        return res.status(400).json({ error: 'Participantes must be an array' });
      }

      const results = [];

      for (const participante of participantes) {
        if (!participante.nomeDoParticipante || !participante.campanhaId) {
          return res.status(400).json({ error: 'nomeDoParticipante and campanhaId are required' });
        }

        const existingParticipante = await prisma.participante.findFirst({
          where: {
            nome: participante.nomeDoParticipante.trim(),
            campanhaId: Number(participante.campanhaId),
          },
        });

        results.push({
          id: participante.id,
          nomeDoParticipante: participante.nomeDoParticipante.trim(),
          matricula_participante: existingParticipante ? existingParticipante.matricula : null,
        });

        if (existingParticipante) {
          console.log(`Participante encontrado: ${JSON.stringify(existingParticipante)}`);
        } else {
          console.log(`Participante ${participante.nomeDoParticipante.trim()} não encontrado`);
        }
      }

      return res.status(200).json(results);
    } catch (e) {
      console.error("Error processing participantes:", e);
      return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
