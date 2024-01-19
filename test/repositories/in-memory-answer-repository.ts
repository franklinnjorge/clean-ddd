import { AnswersRepository } from '@/domain/forum/application/repositories/answer-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswerRepository implements AnswersRepository {
  public items: Answer[] = []

  async findById(slug: string): Promise<Answer | null> {
    const answer = this.items.find((answer) => answer.id.toString() === slug)

    if (!answer) {
      return null
    }

    return answer
  }

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async delete(answer: Answer): Promise<void> {
    const findIndex = this.items.findIndex((items) => items.id === answer.id)

    this.items.splice(findIndex, 1)
  }
}
