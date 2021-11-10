import { Field, ID, ObjectType } from 'type-graphql'
import { v4 } from 'uuid'

@ObjectType()
export class Task {
  @Field(() => ID)
  id: string = v4()
  @Field()
  taskname: string
//   @Field(() => User)
//   user: User
}