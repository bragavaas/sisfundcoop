import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch all campanhas
      const campanhas = await prisma.campanha.findMany({
        include: {
          participantes: true, // Include related participantes
          registros: true, // Include related registros
        },
      });
      res.status(200).json(campanhas);
    } catch (error) {
      console.error('Error fetching campanhas:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      // Create a new campanha
      const { nome, dataInicio, dataTermino, numeroParticipantes, brinde, imagemDoBrinde, participantes } = req.body;

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
      console.error('Error creating campanha:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    try {
      // Parse and validate ID
      const id = parseInt(req.body.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
      }

      // Extract other data from the request body
      const { nome, dataInicio, dataTermino, numeroParticipantes, brinde, imagemDoBrinde } = req.body;

      // Check if the Campanha exists
      const existingCampanha = await prisma.campanha.findUnique({
        where: { id },
      });

      if (!existingCampanha) {
        return res.status(404).json({ error: 'Campanha not found' });
      }

      // Update the Campanha
      const updatedCampanha = await prisma.campanha.update({
        where: { id },
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
      console.error('Error updating campanha:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
        // Delete a campanha
        const { id } = req.query;
        console.log('Parsed ID:', Number(id));

        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }

        const deletedCampanha = await prisma.campanha.delete({
            where: { id: Number(id) },
        });

        res.status(200).json(deletedCampanha);
    } catch (error) {
        console.error('Error deleting campanha:', error.message, error.code);
        res.status(500).json({ error: 'Internal server error' });
    }
  }
 else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
