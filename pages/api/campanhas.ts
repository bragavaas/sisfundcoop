import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      if (id) {
        // Get a single Campanha by ID
        try {
          const campanha = await prisma.campanha.findUnique({
            where: { id: Number(id) },
            include: {
              participantes: true, // Include related participantes
            },
          });
          if (campanha) {
            res.status(200).json(campanha);
          } else {
            res.status(404).json({ error: "Campanha not found" });
          }
        } catch (error) {
          res.status(500).json({ error: "Error fetching campanha" });
        }
      } else {
        // Get all Campanhas
        try {
          const campanhas = await prisma.campanha.findMany({
            include: {
              participantes: true, // Include related participantes
            },
          });
          res.status(200).json(campanhas);
        } catch (error) {
          res.status(500).json({ error: "Error fetching campanhas" });
        }
      }
      break;

      case 'POST':
        if (!id) {
          try {
            const { nome, dataInicio, dataTermino, numeroParticipantes, brinde, participantes } = req.body;
            
            if (!Array.isArray(participantes)) {
              return res.status(400).json({ error: 'Participantes must be an array' });
            }
            
            const newCampanha = await prisma.campanha.create({
              data: {
                nome,
                dataInicio,
                dataTermino,
                numeroParticipantes,
                brinde,
                participantes: {
                  create: participantes, // Ensure participantes is an array of objects
                },
              },
            });
            
            res.status(201).json(newCampanha);
          } catch (error) {
            console.error("Error creating campanha:", error); // Capture and log the error
            res.status(500).json({ error: "Error creating campanha" });
          }
        } else {
          res.status(405).json({ error: "Invalid method for this endpoint" });
        }
        break;
      

    case 'PUT':
      if (id) {
        // Update an existing Campanha by ID
        try {
          const { nome, dataInicio, dataTermino, numeroParticipantes, brinde } = req.body;
          const updatedCampanha = await prisma.campanha.update({
            where: { id: Number(id) },
            data: {
              nome,
              dataInicio,
              dataTermino,
              numeroParticipantes,
              brinde,
            },
          });
          res.status(200).json(updatedCampanha);
        } catch (error) {
          res.status(500).json({ error: "Error updating campanha" });
        }
      } else {
        res.status(405).json({ error: "Invalid method for this endpoint" });
      }
      break;

    case 'DELETE':
      if (id) {
        // Delete a Campanha by ID
        try {
          await prisma.campanha.delete({
            where: { id: Number(id) },
          });
          res.status(204).end();
        } catch (error) {
          res.status(500).json({ error: "Error deleting campanha" });
        }
      } else {
        res.status(405).json({ error: "Invalid method for this endpoint" });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
