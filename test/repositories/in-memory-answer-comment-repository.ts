import { PaginationParams } from '@/core/repositories/pagination'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comments'

export class InMemoryAnswerCommentRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }
}
