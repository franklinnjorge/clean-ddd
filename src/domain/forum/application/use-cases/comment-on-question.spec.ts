import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comment-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'

let inMemorQuestionRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: CommentOnQuestionUseCase
describe('CommentOnQuestionUseCase', () => {
  beforeEach(() => {
    inMemorQuestionRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new CommentOnQuestionUseCase(
      inMemorQuestionRepository,
      inMemoryQuestionCommentRepository,
    )
  })
  it('should be able to comment on question', async () => {
    const question = makeQuestion()
    await inMemorQuestionRepository.create(question)

    const { questionComment } = await sut.execute({
      authorId: 'id-01',
      questionId: question.id.toString(),
      content: 'Answer content',
    })

    expect(inMemoryQuestionCommentRepository.items[0].content).toEqual(
      questionComment.content,
    )
  })
})
