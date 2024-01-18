import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '../repositories/answer-repository'
import { Answer } from '../../enterprise/entities/answer'

interface AnswerQuestionRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private AnswersRepository: AnswersRepository) {}

  async execute({ instructorId, questionId, content }: AnswerQuestionRequest) {
    const ansewer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.AnswersRepository.create(ansewer)
    return ansewer
  }
}
