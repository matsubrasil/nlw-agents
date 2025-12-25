import { reset, seed } from 'drizzle-seed'
import { db, sql } from '@/db/connection'
import { schema } from '@/db/schema'

console.log('Database seed init')

await reset(db, schema)

await seed(db, schema).refine((f) => {
  return {
    rooms: {
      count: 20,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
      },
    },
  }
})
await sql.end()

console.log('Database seed finished')
