import { faker as f } from '@faker-js/faker'
import { db, sql } from '@/db/connection'
import { schema } from '@/db/schema'

async function main() {
  console.log('🌱 Seeding database...')
  // Limpar tabelas (ordem importa se houver FKs)
  await db.delete(schema.questions)
  await db.delete(schema.rooms)

  // Criar salas
  const roomRecords = []
  for (let i = 0; i < 20; i++) {
    const room = {
      name: f.company.name(),
      description: f.lorem.paragraph(),
      createdAt: f.date.recent({ days: 365 }), // retorna Date
    }
    roomRecords.push(room)
  }

  const insertedRooms = await db
    .insert(schema.rooms)
    .values(roomRecords)
    .returning({ id: schema.rooms.id })

  // Criar perguntas para cada sala
  const questionRecords = []

  for (const room of insertedRooms) {
    for (let q = 0; q < 5; q++) {
      questionRecords.push({
        roomId: room.id,
        question: f.lorem.sentence(),
        answer: f.lorem.sentence(),
        createdAt: f.date.recent({
          days: 30,
        }),
      })
    }
  }

  await db.insert(schema.questions).values(questionRecords)

  /*
  await reset(db, schema)

  await seed(db, schema).refine((f) => {
    return {
      rooms: {
        count: 20,
        with: {
          questions: 5,
        },
        columns: {
          name: f.companyName(),
          description: f.loremIpsum(),
          createdAt: f.date.recent({ days: 365 }).getTime(),
        },
      },
    }
  })
*/
  console.log('Database seed finished')
}

main()
  .catch((error) => {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  })
  .finally(async () => {
    await sql.end()
  })
