import { createFileRoute } from '@tanstack/react-router'
import { CreateRoomForm } from '@/components/create-room-form'
import { ListRoom } from '@/components/room-list'

export const Route = createFileRoute('/')({
  component: CreateRoomComponent,
})

function CreateRoomComponent() {
  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 items-start gap-8">
          {/* Formulário */}
          <CreateRoomForm />

          {/* Lista */}
          <ListRoom />
        </div>
      </div>
    </div>
  )
}
