import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswerRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase
describe('CreateQuestionUseCase', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryAnswerRepository)
  })
  it('should be able to create an question', async () => {
    const result = await sut.execute({
      authorId: 'id-01',
      content: 'question content',
      title: 'Question title',
      attachmentsIds: ['attachment-1', 'attachment-2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerRepository.items[0]).toEqual(result.value?.question)
    expect(
      inMemoryAnswerRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(inMemoryAnswerRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({
        attachmentId: new UniqueEntityID('attachment-1'),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityID('attachment-2'),
      }),
    ])
  })
})
