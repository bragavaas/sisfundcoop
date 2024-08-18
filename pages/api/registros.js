import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch all registros
      const registros = await prisma.registro.findMany({
        include: {
          campanha: true, // Include related campanha details
        },
      });
      res.status(200).json(registros);
    } catch (error) {
      console.error('Error fetching registros:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      // Create a new registro
      const { nomeDoParticipante, campanhaId, dataRetirada, horarioRetirada } = req.body;

      if (!nomeDoParticipante || !campanhaId || !dataRetirada || !horarioRetirada) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Check if the campanha exists
      const campanha = await prisma.campanha.findUnique({
        where: { id: campanhaId },
      });

      if (!campanha) {
        return res.status(404).json({ error: 'Campanha not found' });
      }

      // Check if the participant is registered in the campanha
      const participantExists = await prisma.registro.findFirst({
        where: {
          nomeDoParticipante,
          campanhaId,
        },
      });

      if (participantExists) {
        return res.status(400).json({ error: 'Participant already registered for this campanha' });
      }

      const newRegistro = await prisma.registro.create({
        data: {
          nomeDoParticipante,
          campanhaId,
          dataRetirada,
          horarioRetirada,
        },
      });

      res.status(201).json(newRegistro);
    } catch (error) {
      console.error('Error creating registro:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    try {
      // Update an existing registro
      const { id, nomeDoParticipante, campanhaId, dataRetirada, horarioRetirada } = req.body;

      if (!id || !nomeDoParticipante || !campanhaId || !dataRetirada || !horarioRetirada) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Check if the registro exists
      const existingRegistro = await prisma.registro.findUnique({
        where: { id },
      });

      if (!existingRegistro) {
        return res.status(404).json({ error: 'Registro not found' });
      }

      // Check if the campanha exists
      const campanha = await prisma.campanha.findUnique({
        where: { id: campanhaId },
      });

      if (!campanha) {
        return res.status(404).json({ error: 'Campanha not found' });
      }

      const updatedRegistro = await prisma.registro.update({
        where: { id },
        data: {
          nomeDoParticipante,
          campanhaId,
          dataRetirada,
          horarioRetirada,
        },
      });

      res.status(200).json(updatedRegistro);
    } catch (error) {
      console.error('Error updating registro:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Delete a registro
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'ID is required' });
      }

      // Check if the registro exists
      const existingRegistro = await prisma.registro.findUnique({
        where: { id: parseInt(id) },
      });

      if (!existingRegistro) {
        return res.status(404).json({ error: 'Registro not found' });
      }

      const deletedRegistro = await prisma.registro.delete({
        where: { id: parseInt(id) },
      });

      res.status(200).json(deletedRegistro);
    } catch (error) {
      console.error('Error deleting registro:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
