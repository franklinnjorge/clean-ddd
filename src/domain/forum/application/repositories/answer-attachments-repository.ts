import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'

export interface AnswerAttachmentsRepository {
  findManyByQuestionId(questionId: string): Promise<AnswerAttachment[]>
  deleteManyByQuestionId(questionId: string): Promise<void>
}
