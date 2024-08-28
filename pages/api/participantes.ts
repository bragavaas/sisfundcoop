import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      if (id) {
        // Get a single Participantes by campanha ID
        try {
          const participantes = await prisma.participante.findMany({
            where: { campanhaId: Number(id) },
          });
          res.status(200).json(participantes.length);
        } catch (error) {
          res.
          status(500).json({ error: "Error fetching participantes" });
        }
    } else {
      res.status(400).json({ error: "Missing campanha ID" });
    }
  }
}