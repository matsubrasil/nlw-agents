import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '@/db/connection'
import { schema } from '@/db/schema'

export const listRooms: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/rooms',
    {
      schema: {
        summary: 'List all rooms',
        tags: ['rooms'],

        response: {
          200: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
            }),
          ),
        },
      },
    },
    async (_, reply) => {
      const results = await db
        .select({
          id: schema.rooms.id,
          name: schema.rooms.name,
        })
        .from(schema.rooms)
        .orderBy(schema.rooms.createdAt)
      return reply.send(results)
    },
  )
}
