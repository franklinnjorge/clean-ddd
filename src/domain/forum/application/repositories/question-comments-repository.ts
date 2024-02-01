import { PaginationParams } from '@/core/repositories/pagination'
import { Question } from '../../enterprise/entities/question'
import { QuestionComment } from '../../enterprise/entities/question-comments'

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>
}
