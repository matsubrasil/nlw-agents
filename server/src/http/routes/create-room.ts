import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '@/db/connection'
import { schema } from '@/db/schema'

export const createRoom: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/rooms',
    {
      schema: {
        summary: 'create',
        description: 'Create a new room',
        tags: ['rooms'],
        body: z.object({
          name: z.string().min(1),
          description: z.string().optional(),
        }),

        response: {
          201: z.object({
            roomId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, description } = request.body

      const result = await db
        .insert(schema.rooms)
        .values({
          name,
          description,
        })
        .returning()

      const insertedRoom = result[0]
      if (!insertedRoom) {
        throw new Error('Failed to create new room.')
      }

      return reply.status(201).send({ roomId: insertedRoom.id })
    },
  )
}
