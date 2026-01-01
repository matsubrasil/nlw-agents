import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/room/$roomId/audio')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/room/$roomId/audio"!</div>
}
