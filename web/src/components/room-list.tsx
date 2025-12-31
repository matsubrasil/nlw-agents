import { Link } from '@tanstack/react-router'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight } from 'lucide-react'
import { useRooms } from '@/http/use-rooms'
import { Badge } from './ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

export function ListRoom() {
  const { data, isLoading } = useRooms()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sala recentes</CardTitle>
        <CardDescription>
          AScesso rápido para as salas criadas recentemente
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading && (
          <p className="text-muted-foreground text-sm">Carregando sala...</p>
        )}

        {data?.map((room) => {
          return (
            <Link
              to="/room/$id"
              params={{ id: room.id }}
              key={room.id}
              className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50"
            >
              <div className="flex flex-1 flex-col gap-1">
                <h3 className="font-medium">{room.name}</h3>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {room?.createdAt
                      ? formatDistance(new Date(room.createdAt), new Date(), {
                          addSuffix: true, // Adiciona o "há ..."
                          locale: ptBR, // Traduz para português
                        })
                      : 'Carregando...'}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {room.questionsCount} pergunta(s)
                  </Badge>
                </div>
              </div>

              <span className="flex items-center gap-1 text-sm">
                Entrar <ArrowRight className="size-3" />
              </span>
            </Link>
          )
        })}
      </CardContent>
    </Card>
  )
}
