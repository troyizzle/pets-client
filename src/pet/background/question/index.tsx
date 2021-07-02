export interface PetBackgroundQuestionType {
  id: string,
  type: string,
  attributes: {
    question: string,
    answers: {
      id: number,
      answer: string,
      question_id: number,
      created_at: Date,
      updated_at: Date
    }[]
  }
}
