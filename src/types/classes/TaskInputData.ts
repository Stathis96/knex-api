import { IsString } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class TaskInputData {
  @Field()
  @IsString()
  taskname: string
}
