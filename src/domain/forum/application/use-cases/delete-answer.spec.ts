import { DeleteAnswerUseCase } from './delete-answer'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswerRepository
let sut: DeleteAnswerUseCase
describe('DeleteAnswerUseCase', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })
  it('should be able to delete a answer', async () => {
    const answer = makeAnswer(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(answer)

    sut.execute({ answerId: 'answer-1', authorId: 'author-1' })

    expect(inMemoryAnswersRepository.items).toBeTruthy()
  })

  it('should not be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    expect(() => {
      return sut.execute({ answerId: 'answer-1', authorId: 'author-2' })
    }).rejects.toBeInstanceOf(Error)
  })
})
