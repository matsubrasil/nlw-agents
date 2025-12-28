import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'
import { rooms } from '@/db/schema/rooms'

export const questions = pgTable('questions', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  roomId: uuid('room_id')
    .references(() => rooms.id)
    .notNull(),
  question: text().notNull(),
  answer: text(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
})
