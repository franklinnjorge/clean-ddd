import { Answer } from '../entities/answer'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answer-repository'

const fakeAnswersRepository: AnswersRepository = {
    create: async (answer: Answer) => {
        return;
    }
}

test('create an answer', async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

    const answer = await answerQuestion.execute({
        instructorId: 'any_id',
        questionId: 'any_id',
        content: 'Answer content'
    })

    expect(answer.content).toEqual('Answer content')
})