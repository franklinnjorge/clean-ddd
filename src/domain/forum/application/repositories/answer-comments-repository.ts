import { PaginationParams } from '@/core/repositories/pagination'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerComment } from '../../enterprise/entities/answer-comments'

export interface AnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>
}
