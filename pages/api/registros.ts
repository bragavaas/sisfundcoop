import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      if (id) {
        // Get a single registro by ID
        try {
          const registro = await prisma.registro.findUnique({
            where: { id: Number(id) },
            include: { campanha: true }, // Include the campanha relation
          });
          if (registro) {
            res.status(200).json(registro);
          } else {
            res.status(404).json({ error: "Registro not found" });
          }
        } catch (error) {
          console.error("Error fetching registro:", error);
          res.status(500).json({ error: "Error fetching registro" });
        }
      } else {
        // Get all registros
        try {
          const registros = await prisma.registro.findMany({});
          res.status(200).json(registros);
        } catch (error) {
          console.error("Error fetching registros:", error);
          res.status(500).json({ error: "Error fetching registros" });
        }
      }
      break;

    case 'POST':
      if (!id) {
        // Create a new registro
        try {
          const { nomeDoParticipante, matriculaDoParticipante, dataRetirada, horarioRetirada, campanhaId } = req.body;

          const newRegistro = await prisma.registro.create({
            data: {
              nomeDoParticipante,
              matriculaDoParticipante,
              dataRetirada,
              horarioRetirada,
              campanha: { connect: { id: campanhaId } }, // Connect to existing campanha
            },
          });
          res.status(201).json(newRegistro);
        } catch (error) {
          console.error("Error creating registro:", error);
          res.status(500).json({ error: "Error creating registro" });
        }
      } else {
        res.status(405).json({ error: "Invalid method for this endpoint" });
      }
      break;

    case 'PUT':
      if (id) {
        // Update an existing registro by ID
        try {
          const { nomeDoParticipante, matriculaDoParticipante, dataRetirada, horarioRetirada, campanhaId } = req.body;
          const updatedRegistro = await prisma.registro.update({
            where: { id: Number(id) },
            data: {
              nomeDoParticipante,
              matriculaDoParticipante,
              dataRetirada,
              horarioRetirada,
              campanha: { connect: { id: campanhaId } }, // Connect to existing campanha
            },
          });
          res.status(200).json(updatedRegistro);
        } catch (error) {
          console.error("Error updating registro:", error);
          res.status(500).json({ error: "Error updating registro" });
        }
      } else {
        res.status(405).json({ error: "Invalid method for this endpoint" });
      }
      break;

    case 'DELETE':
      if (id) {
        // Delete a registro by ID
        try {
          await prisma.registro.delete({
            where: { id: Number(id) },
          });
          res.status(204).end();
        } catch (error) {
          console.error("Error deleting registro:", error);
          res.status(500).json({ error: "Error deleting registro" });
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
