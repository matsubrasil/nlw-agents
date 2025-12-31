import { useQuery } from "@tanstack/react-query"
import type { GetRoomsResponse } from "./types/get-rooms-response"

export function useRooms() {
    return useQuery({
    queryKey: ['list-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms')
      const result: GetRoomsResponse = await response.json()
      console.log(result)
      return result
    },
  })
}