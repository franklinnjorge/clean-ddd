import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/question-repository'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  question: Question
}

interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    question,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const questionRecieved = await this.questionRepository.findById(
      question.id.toString(),
    )

    if (!questionRecieved) {
      throw new Error('Question not found')
    }

    if (questionRecieved.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    await this.questionRepository.delete(question)

    return {}
  }
}
