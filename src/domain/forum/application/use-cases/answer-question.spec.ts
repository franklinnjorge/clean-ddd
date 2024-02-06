import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase
describe('AnswerQuestionUseCase', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })
  it('should be able to create an answer', async () => {
    const result = await sut.execute({
      instructorId: 'any_id',
      questionId: 'any_id',
      content: 'Answer content',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerRepository.items[0]).toEqual(result.value?.answer)
  })
})
