import { desc, eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '@/db/connection'
import { schema } from '@/db/schema'

export const getRoomQuestions: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/rooms/:roomId/questions',
    {
      schema: {
        summary:
          'List Room Questions: Returns all questions for the given room.',
        tags: ['questions'],

        params: z.object({
          roomId: z.string(),
        }),

        response: {
          200: z.object({
            questions: z.array(
                z.object({
                    id: z.string(),
                    question: z.string(),
                    answer: z.string().nullable(),
                })
            )
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { roomId } = request.params
      console.log(roomId)

      // 1. Primeiro verifica se a sala existe
      const roomExists = await db.select().from(schema.rooms).where(eq(schema.rooms.id, roomId))
      
      if (!roomExists) {
        return reply.status(404).send({ message: 'Room not found' })
      }

      const results = await db
        .select({
          id: schema.questions.id,
          question: schema.questions.question,
          answer: schema.questions.answer,
        })
        .from(schema.questions)
        .where(eq(schema.questions.roomId, roomId))
        .orderBy(desc(schema.questions.createdAt))

      // 2. Se a sala existe, apenas retorna o que houver (mesmo que seja [])
      return reply.status(200).send({questions: results})
    },
  )
}

/*
z.array(
            z.object({
              id: z.string(),
              question: z.string(),
              answer: z.string().nullable(),
            }),
          )

*/