import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase
describe('Fetch Recent Questions UseCase', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionRepository)
  })
  it('should be able to fetch questions', async () => {
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2023, 0, 20) }),
    )
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2023, 0, 25) }),
    )
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2023, 0, 23) }),
    )

    const { questions } = await sut.execute({ page: 1 })

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2023, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2023, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2023, 0, 25) }),
    ])
  })

  it('should be able to fetch pagination', async () => {
    for (let i = 0; i < 23; i++) {
      await inMemoryQuestionRepository.create(makeQuestion())
    }

    const { questions } = await sut.execute({ page: 2 })

    expect(questions).toHaveLength(3)
  })
})
