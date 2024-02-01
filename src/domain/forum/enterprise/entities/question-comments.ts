import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { CommentsProps, Comment } from './comments'

export interface QuestionCommentsProps extends CommentsProps {
  answerId: UniqueEntityID
}

export class QuestionComment extends Comment<QuestionCommentsProps> {
  get answerId() {
    return this.props.answerId
  }

  static create(
    props: Optional<QuestionCommentsProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return questionComment
  }
}
