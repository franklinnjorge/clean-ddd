import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { CreateQuestionUseCase } from './creation-question'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase
describe('DeleteQuestionUseCase', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(question)

    await sut.execute({ question, authorId: 'author-1' })

    expect(inMemoryQuestionsRepository.items).toBeTruthy()
  })

  it('should not be able to delete a question from another user', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(question)

    expect(() => {
      return sut.execute({ question, authorId: 'author-2' })
    }).rejects.toBeInstanceOf(Error)
  })
})
