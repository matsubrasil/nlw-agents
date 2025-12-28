import { faker as f } from '@faker-js/faker'
import { db, sql } from '@/db/connection'
import { schema } from '@/db/schema'

async function main() {
  console.log('🌱 Seeding database...')
  // Limpar tabelas (ordem importa se houver FKs)
  await db.delete(schema.questions)
  await db.delete(schema.rooms)

  // 2. Gerar salas de forma declarativa
  const roomData = Array.from({ length: 20 }, () => ({
    name: f.company.name(),
    description: f.lorem.paragraph(),
    createdAt: f.date.recent({ days: 365 }),
  }))

  const insertedRooms = await db
    .insert(schema.rooms)
    .values(roomData)
    .returning({ id: schema.rooms.id })

  // 3. Gerar perguntas mapeando as salas inseridas
  const questionRecords = insertedRooms.flatMap((room) =>
    Array.from({ length: 5 }, () => ({
      roomId: room.id,
      question: f.lorem.sentence(),
      answer: f.lorem.sentence(),
      createdAt: f.date.recent({ days: 30 }),
    })),
  )

  if (questionRecords.length > 0) {
    await db.insert(schema.questions).values(questionRecords)
  }

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
