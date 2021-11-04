import { ApolloServer, gql } from 'apollo-server'
import { getClient } from './database/db-connection'

const PORT: number | undefined = parseInt(<string>process.env.API_DOCKER_PORT, 10)
const HOSTNAME: string = 'students-api'

async function getStudents () {
  const client = await getClient()
  try {
    const result = await client.query('SELECT * FROM public.students LIMIT 50')
    return result.rows
  } catch {
    console.warn('No data found.')
  } finally {
    client.release()
  }
}

const typeDefs = gql`
  type Student {
    name: String!,
    cpf: String!,
    email: String!
  }
  type Query {
    students: [Student]
  }
`
const resolvers = {
  Query: {
    students: () => getStudents()
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen({ port: PORT, host: HOSTNAME }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
