import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswerRepository
let sut: EditAnswerUseCase
describe('EditAnswerUseCase', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const answer = makeAnswer(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      authorId: 'author-1',
      answerId: answer.id.toValue(),
      content: 'New edited content',
    })

    expect(inMemoryAnswersRepository.items[0]).toEqual(
      expect.objectContaining({
        content: 'New edited content',
      }),
    )
  })
})

it('should not be able to edit a answer from another user', async () => {
  const answer = makeAnswer(
    { authorId: new UniqueEntityID('author-1') },
    new UniqueEntityID('answer-1'),
  )

  await inMemoryAnswersRepository.create(answer)
  const result = await sut.execute({
    authorId: 'author-2',
    answerId: 'answer-1',
    content: 'New edited content',
  })

  expect(result.isLeft()).toBe(true)
  expect(result.value).toBeInstanceOf(NotAllowedError)
})
