import { PaginationParams } from '@/core/repositories/pagination'
import { AnswersRepository } from '@/domain/forum/application/repositories/answer-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryAnswerRepository implements AnswersRepository {
  public items: Answer[] = []

  async findById(slug: string): Promise<Answer | null> {
    const answer = this.items.find((answer) => answer.id.toString() === slug)

    if (!answer) {
      return null
    }

    return answer
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async delete(answer: Answer): Promise<void> {
    const findIndex = this.items.findIndex((items) => items.id === answer.id)

    this.items.splice(findIndex, 1)
  }

  async save(answer: Answer) {
    const findIndex = this.items.findIndex(
      (items) => items.id.toString() === answer.id.toString(),
    )

    this.items[findIndex] = answer
  }
}
