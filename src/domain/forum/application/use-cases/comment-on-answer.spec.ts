import { makeAnswer } from 'test/factories/make-answer'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comment-repository'

let inMemorAnswerRepository: InMemoryAnswerRepository
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: CommentOnAnswerUseCase
describe('CommentOnAnswerUseCase', () => {
  beforeEach(() => {
    inMemorAnswerRepository = new InMemoryAnswerRepository()
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new CommentOnAnswerUseCase(
      inMemorAnswerRepository,
      inMemoryAnswerCommentRepository,
    )
  })
  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()
    await inMemorAnswerRepository.create(answer)

    const result = await sut.execute({
      authorId: 'id-01',
      answerId: answer.id.toString(),
      content: 'Answer content',
    })

    expect(result.isRight()).toBe(true)

    expect(inMemoryAnswerCommentRepository.items[0].content).toEqual(
      result.value?.answerComment?.content,
    )
  })
})
