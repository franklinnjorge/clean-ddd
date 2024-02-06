import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './creation-question'

let inMemoryAnswerRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase
describe('CreateQuestionUseCase', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryAnswerRepository)
  })
  it('should be able to create an answer', async () => {
    const result = await sut.execute({
      authorId: 'id-01',
      content: 'Answer content',
      title: 'Question title',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerRepository.items[0]).toEqual(result.value?.question)
  })
})
