import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase
describe('EditQuestionUseCase', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      authorId: 'author-1',
      questionId: question.id.toValue(),
      title: 'New edited title',
      content: 'New edited content',
    })

    expect(inMemoryQuestionsRepository.items[0]).toEqual(
      expect.objectContaining({
        title: 'New edited title',
      }),
    )
  })
})

it('should not be able to edit a question from another user', async () => {
  const question = makeQuestion(
    { authorId: new UniqueEntityID('author-1') },
    new UniqueEntityID('question-1'),
  )

  await inMemoryQuestionsRepository.create(question)

  const result = await sut.execute({
    authorId: 'author-2',
    questionId: 'question-1',
    title: 'New edited title',
    content: 'New edited content',
  })

  expect(result.isLeft()).toBe(true)
  expect(result.value).toBeInstanceOf(NotAllowedError)
})
