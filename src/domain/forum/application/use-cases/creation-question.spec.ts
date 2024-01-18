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
    const { question } = await sut.execute({
      authorId: 'id-01',
      content: 'Answer content',
      title: 'Question title',
    })

    expect(question.id).toBeTruthy()
  })
})
