import { PaginationParams } from '@/core/repositories/pagination'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comments'

export class InMemoryQuestionCommentRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }
}
