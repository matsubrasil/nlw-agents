import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})
type GetRoomsAPIResponse = Array<{
  id: string
  name: string
}>

function Index() {
  const { data, isLoading } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms')
      const result: GetRoomsAPIResponse = await response.json()
      return result
    },
  })
  return (
    <div>
      <div>Create Rooms</div>
      {isLoading && <p>Carregando...</p>}
      <div className="flex flex-col gap-1">
        {data?.map((room) => (
          <Link key={room.id} to="/room/$id" params={{ id: room.id }}>
            {room.id}
          </Link>
        ))}
      </div>
    </div>
  )
}
