import { Knex } from 'knex'
import { v4 } from 'uuid';
import { Task } from "src/types/entities/Task";
import { User } from 'src/types/entities/User';
import { TaskInputData } from 'src/types/classes/TaskInputData';

import { uniq } from 'ramda'

export async function getTasksAction(connection: Knex): Promise<Task[]>{
  const tasks = await connection('tasks')
  const users = await connection('users')
    .whereIn('id', uniq(tasks.map(t => t.user))) //line 11 would work too, but in order to get only ascociated users and only ONCE (hence uniq)
  
  const populatedTasks = tasks.map(task => {
    const userTasks = users.find(user => user.id === task.user) as User
    console.log("show me user's Tasks",userTasks)
    return {
      ...task,
       user: userTasks
    }
  })
  console.log("populatedTasks is ", populatedTasks)
  return populatedTasks
}

export async function createTaskAction(id:string, data: TaskInputData, connection: Knex): Promise<boolean>{
  const user = await connection('users').where('id', id).first()

  if (!user) return false // throw error

  await connection('tasks').insert({id: v4(), taskname: data.taskname, user: user.id})
  return true
}

export async function updateTaskAction(id: string, data: TaskInputData, connection: Knex): Promise<boolean>{
  const task = await connection('tasks').where('id', id).update({
    taskname: data.taskname
  })
  if (task) return true
  return false
}

export async function deleteTaskAction(id: string, connection: Knex): Promise<boolean>{
  const task = await connection('tasks').where('id', id).delete()
  if (task) return true
  return false
}

