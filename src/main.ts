import 'reflect-metadata'

import { createServer } from 'http'
import Koa, { Context } from 'koa'
import cors from '@koa/cors'
import { ApolloServer } from 'apollo-server-koa'

import { buildSchema } from 'type-graphql'

import { ENVIRONMENT, HOST, PORT } from './dependencies/config'

import { CustomContext } from './types/interfaces/CustomContext'

import { connection } from 'src/dependencies/knex'

import { CoreResolver } from './lib/resolvers/CoreResolver'
import { UserResolver } from './lib/resolvers/UserResolver'
import { TaskResolver } from './lib/resolvers/TaskResolver'

async function main (): Promise<void> {
  console.log(`ENVIRONMENT: ${ENVIRONMENT}`)
  console.log('=== SETUP DATABASE ===')

  console.log('=== BUILDING GQL SCHEMA ===')
  const schema = await buildSchema({
    resolvers: [CoreResolver,UserResolver,TaskResolver]

  })

  const apolloServer = new ApolloServer({
    schema,
    context ({ ctx }: { ctx: Context }): CustomContext {
      return {
        ctx,
        knex: connection
      }
    }
  })

  const app = new Koa()

  if (ENVIRONMENT === 'production') {
    app.proxy = true
  }

  await apolloServer.start()

  app.use(cors())
  app.use(apolloServer.getMiddleware({ cors: false }))

  const httpServer = createServer(app.callback())

  httpServer.listen({ port: PORT }, () => {
    console.log(`http://${HOST}:${PORT}/graphql`)
  })
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
