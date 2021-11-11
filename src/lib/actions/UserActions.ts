import { Knex } from 'knex'
import { User } from "src/types/entities/User";
import { Task } from "src/types/entities/Task";
import { UserInputData } from 'src/types/classes/UserInputData'
import { v4 } from 'uuid';
 

export async function getUsersAction(connection: Knex): Promise<User[]>{
  const users = await connection('users')
  const tasks = await connection('tasks')

  const populatedUsers = users.map(user => {
    const userTasks = tasks.filter(task => task.user === user.id) as Task[]
    return {
      ...user,
       tasks: userTasks
    }
  })
  return populatedUsers
}

export async function getUserAction(id: string, connection: Knex): Promise<User>{
  const user = await connection('users').where('id', id).first()

  const userTask = await connection('tasks').where('user', user.id) as Task[]

  const result: User = {
    ...user,
    tasks: userTask
  }
  
  return result
}

export async function createUserAction(data: UserInputData, connection: Knex): Promise<boolean>{
  const user = await connection('users').insert({id: v4(),fullname: data.fullname, email: data.email})
  if (user) return true
  return false
}

export async function updateUserAction(id: string, data: UserInputData, connection: Knex): Promise<boolean>{
  const user = await connection('users').where('id', id).update({
    fullname: data.fullname,
    email: data.email
  })
  if (user) return true
  return false
}

export async function deleteUserAction(id: string, connection: Knex): Promise<boolean>{
  const user = await connection('users').where('id', id).delete()
  if (user) return true
  return false
}