import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/room/$id')({
  component: RoomDetailComponent,
})

function RoomDetailComponent() {
  const { id } = Route.useParams()

  if (!id) {
    return <Navigate replace to={'/'} />
  }
  return <div>Hello `/room/${id}!`</div>
}
