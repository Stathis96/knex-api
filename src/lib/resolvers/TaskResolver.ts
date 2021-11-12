import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Knex } from 'knex'
import { Task } from 'src/types/entities/Task'
import { createTaskAction, deleteTaskAction, getTasksAction, updateTaskAction } from '../actions/TaskActions'
import { TaskInputData } from 'src/types/classes/TaskInputData'

@Resolver()
export class TaskResolver {
  @Query(() => [Task])
  async getAllTasks (
    @Ctx('knex') knex: Knex
  ): Promise <Task[]> {
    return await getTasksAction(knex)
  }

  @Mutation(() => Boolean)
  async createTask (
    @Ctx('knex') knex: Knex,
      @Arg('id', () => String) id: string,
      @Arg('data', () => TaskInputData) data: TaskInputData
  ): Promise<boolean> {
    return await createTaskAction(id, data, knex)
  }

  @Mutation(() => Boolean)
  async updateTask (
    @Ctx('knex') knex: Knex,
      @Arg('id', () => String) id: string,
      @Arg('data', () => TaskInputData) data: TaskInputData
  ): Promise<boolean> {
    return await updateTaskAction(id, data, knex)
  }

  @Mutation(() => Boolean)
  async deleteTask (
    @Ctx('knex') knex: Knex,
      @Arg('id', () => String) id: string
  ): Promise<boolean> {
    return await deleteTaskAction(id, knex)
  }

}