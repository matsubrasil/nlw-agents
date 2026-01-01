import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Radio } from 'lucide-react'
import { z } from 'zod'
import { QuestionForm } from '@/components/question-form'

import { QuestionList } from '@/components/question-list'
import { Button } from '@/components/ui/button'

const roomParamsSchema = z.object({
  roomId: z.string().min(3, 'O ID da sala deve ter pelo menos 3 caracteres'),
})

export const Route = createFileRoute('/room/$roomId')({
  // 2. Use parseParams para validar e transformar os dados
  parseParams: (params) => roomParamsSchema.parse(params),

  // Opcional: O que mostrar se a validação falhar
  errorComponent: ({ error }) => {
    return <div>ID de sala inválido: {error.message}</div>
  },
  component: RoomDetailComponent,
})

function RoomDetailComponent() {
  const { roomId } = Route.useParams()

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 size-4" />
                Voltar ao Início
              </Button>
            </Link>
            <Link to="/room/$roomId/audio" params={{ roomId: roomId }}>
              <Button className="flex items-center gap-2" variant="secondary">
                <Radio className="size-4" />
                Gravar Áudio
              </Button>
            </Link>
          </div>
          <h1 className="mb-2 font-bold text-3xl text-foreground">
            Sala de Perguntas
          </h1>
          <p className="text-muted-foreground">
            Faça perguntas e receba respostas com IA
          </p>
        </div>

        <div className="mb-8">
          <QuestionForm roomId={roomId} />
        </div>

        <QuestionList roomId={roomId} />
      </div>
    </div>
  )
}

// Rocketseat = pages => create-room.tsx
// Ale        = routes => index.tsx

// Rocketseat = pages => room.tsx
// Ale        = routes => room.$roomId.tsx
