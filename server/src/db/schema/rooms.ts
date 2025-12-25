import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { uuidv7 } from 'uuidv7'

export const rooms = pgTable('rooms', {
  id: text()
    .primaryKey()
    .$default(() => uuidv7()),
  name: text().notNull(),
  description: text(),
  createdAt: timestamp().defaultNow().notNull(),
})
