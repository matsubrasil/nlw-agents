import { useQuery } from "@tanstack/react-query"
import type { GetRoomQuestionsResponse } from "./get-room-questions-response"




export function useRoomQuestions(roomId: string) {
    return useQuery({
    queryKey: ['list-questions', roomId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/rooms/${roomId}/questions`)
      const result: GetRoomQuestionsResponse = await response.json()
      console.log(result)
      return result
    },
  })
}

// [
//     { id, question, answer, createdAt }
// ]

// {
//     questions: [
//          { id, question, answer, createdAt }
//     ]
// }