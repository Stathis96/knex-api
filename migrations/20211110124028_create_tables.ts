import { Knex } from 'knex'
export async function up (knex: Knex): Promise<void> {
  return await knex
    .schema
    .createTable('users', (table) => {
      table.uuid('id').primary()
      table.string('fullname', 255).notNullable()
      table.string('email', 255).notNullable()
    })
    .createTable('tasks', (table) => {
      table.uuid('id').primary()
      table.string('taskname', 255).notNullable()
      table.string('user', 255).index().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
    })
}

export async function down (knex: Knex): Promise<void> {
  console.log(knex)
}
