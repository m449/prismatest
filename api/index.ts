import { prisma } from './generated/prisma-client'
import datamodelInfo from './generated/nexus-prisma'
import * as path from 'path'
import { stringArg, idArg } from 'nexus'
import { prismaObjectType, makePrismaSchema } from 'nexus-prisma'
import { GraphQLServer } from 'graphql-yoga'

const Query = prismaObjectType({
  name: 'Query',
  definition(t) {
    t.prismaFields(['item'])
    t.list.field('feed', {
      type: 'Item',
      resolve: (_, args, ctx) =>
        ctx.prisma.items({ where: { published: true } }),
    })
    t.list.field('itemsByUser', {
      type: 'Item',
      args: { email: stringArg() },
      resolve: (_, { email }, ctx) =>
        ctx.prisma.items({ where: { author: { email } } }),
    })
  },
})

const Mutation = prismaObjectType({
  name: 'Mutation',
  definition(t) {
    t.prismaFields(['createUser', 'deleteItem'])
    t.field('createDraft', {
      type: 'Item',
      args: {
        title: stringArg(),
        authorId: idArg({ nullable: true }),
      },
      resolve: (_, { title, authorId }, ctx) =>
        ctx.prisma.createItem({
          title,
          author: { connect: { id: authorId } },
        }),
    })
    t.field('publish', {
      type: 'Item',
      nullable: true,
      args: { id: idArg() },
      resolve: (_, { id }, ctx) =>
        ctx.prisma.updateItem({
          where: { id },
          data: { published: true },
        }),
    })
  },
})

const schema = makePrismaSchema({
  types: [Query, Mutation],

  prisma: {
    datamodelInfo,
    client: prisma,
  },

  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
})

const server = new GraphQLServer({
  schema,
  context: { prisma },
})
server.start(() => console.log('Server is running on http://localhost:4000'))