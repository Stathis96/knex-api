import { Field, ID, ObjectType } from 'type-graphql'
import { v4 } from 'uuid'

@ObjectType()
export class User {
  @Field(() => ID)
  id: string = v4()
  @Field()
  fullname: string
  @Field()
  email: string
  // @Field(() => [Task])
  // tasks: Task[]
}