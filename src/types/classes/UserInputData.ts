import { IsString } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class UserInputData {
  @Field()
  @IsString()
  fullname: string

  @Field()
  @IsString()
  email: string
}
