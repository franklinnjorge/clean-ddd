import { Question } from '../../enterprise/entities/question'

export interface QuestionsRepository {
  findById(slug: string): Promise<Question | null>
  create(question: Question): Promise<void>
  delete(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
}
