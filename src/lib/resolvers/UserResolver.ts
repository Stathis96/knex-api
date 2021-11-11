import { User } from 'src/types/entities/User'
import { Ctx, Arg, Query, Resolver, Mutation } from 'type-graphql'
import { Knex } from 'knex'
import { createUserAction, deleteUserAction, getUserAction, getUsersAction, updateUserAction } from '../actions/UserActions'
import { UserInputData } from 'src/types/classes/UserInputData'

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getAllUsers (
    @Ctx('knex') knex: Knex
  ): Promise <User[]> {
    return await getUsersAction(knex)
  }

  @Query(() => User)
  async getUser (
    @Ctx('knex') knex: Knex,
    @Arg('id') id: string
  ): Promise <User> {
    return await getUserAction(id, knex)
  }

  @Mutation(() => Boolean)
  async createUser (
    @Ctx('knex') knex: Knex,
      @Arg('data', () => UserInputData) data: UserInputData
  ): Promise<boolean> {
    return await createUserAction(data, knex)
  }

  @Mutation(() => Boolean)
  async updateUser (
    @Ctx('knex') knex: Knex,
      @Arg('id', () => String) id: string,
      @Arg('data', () => UserInputData) data: UserInputData
  ): Promise<boolean> {
    return await updateUserAction(id, data, knex)
  }

  @Mutation(() => Boolean)
  async deleteUser (
    @Ctx('knex') knex: Knex,
      @Arg('id', () => String) id: string
  ): Promise<boolean> {
    return await deleteUserAction(id, knex)
  }
}