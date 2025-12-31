import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '@/db/connection'
import { schema } from '@/db/schema'

export const createQuestion: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/rooms/:roomId/questions',
    {
      schema: {
        summary: 'create',
        description: 'Create a new room question',
        tags: ['questions'],

        params: z.object({
          roomId: z.string(),
        }),

        body: z.object({
          question: z.string(),
        }),

        response: {
          201: z.object({
            questionId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { question } = request.body
      const { roomId } = request.params

      const result = await db
        .insert(schema.questions)
        .values({
          roomId,
          question,
        })
        .returning()

      const insertedQuestion = result[0]
      if (!insertedQuestion) {
        throw new Error('Failed to create new question.')
      }

      return reply.status(201).send({ questionId: insertedQuestion.id })
    },
  )
}
