import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '../repositories/answer-repository'
import { Answer } from '../../enterprise/entities/answer'
import { Question } from '../../enterprise/entities/question'
import { AnswerQuestionUseCase } from './answer-question'
import { QuestionsRepository } from '../repositories/question-repository'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    authorId,
    content,
    title,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      title,
      content,
      authorId: new UniqueEntityID(authorId),
    })

    await this.questionRepository.create(question)

    return {
      question,
    }
  }
}
