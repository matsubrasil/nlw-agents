
export type QuestionsResponse = {
  id: string
  question: string
  answer: string | null
  createdAt: string
}

export type GetRoomQuestionsResponse = {
    questions: QuestionsResponse[]
}