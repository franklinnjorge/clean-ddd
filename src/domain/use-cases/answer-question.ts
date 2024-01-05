import { Answer } from "../entities/answer"
import { AnswersRepository } from "../repositories/answer-repository"

interface AnswerQuestionRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(
    private AnswersRepository: AnswersRepository
  ){}
  async execute({ instructorId, questionId, content }: AnswerQuestionRequest) {
    const ansewer = new Answer({
      content,
      authorId: instructorId,
      questionId
    })

    await this.AnswersRepository.create(ansewer)
    return ansewer
  }

}