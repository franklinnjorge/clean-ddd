import { PaginationParams } from '@/core/repositories/pagination'
import { Answer } from '../../enterprise/entities/answer'
import { Question } from '../../enterprise/entities/question'

export interface AnswersRepository {
  findById(id: string): Promise<Answer | null>
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]>
  create(answer: Answer): Promise<void>
  save(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
}
