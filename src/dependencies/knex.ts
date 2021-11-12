import knex from 'knex'
import { TaskRow } from 'src/types/interfaces/Rows/TaskRow'
import { UserRow } from 'src/types/interfaces/Rows/UserRow'

export const connection = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'knex-project'
  },
  migrations: {
    extension: 'ts'
  }
})

declare module 'knex/types/tables' {
  interface Tables {
    users: UserRow
    tasks: TaskRow
  }
}


