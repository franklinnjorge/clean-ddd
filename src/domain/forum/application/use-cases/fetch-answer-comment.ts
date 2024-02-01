import { AnswerComment } from '../../enterprise/entities/answer-comments'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface FetchAnswerCommentsUseCaseRequest {
  answerCommentId: string
  page: number
}

interface FetchAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerCommentId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerCommentId(
        answerCommentId,
        {
          page,
        },
      )

    return {
      answerComments,
    }
  }
}
