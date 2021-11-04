import { createServer } from 'http'

const PORT: number | undefined = parseInt(<string>process.env.API_DOCKER_PORT, 10)
const HOSTNAME: string = 'students-api'

const server = createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World! I am the students api service.')
})

server.listen(PORT, HOSTNAME, () => {
  console.log(`Students API server running on port ${PORT}`)
})
