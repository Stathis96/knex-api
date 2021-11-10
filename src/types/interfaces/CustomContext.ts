import { Context } from 'koa'
import { Knex } from 'knex'


export interface CustomContext {
  ctx: Context

  knex: Knex
}
