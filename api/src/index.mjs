import { createServer } from 'http'
const HOSTNAME = 'students-api'
const PORT = process.env.API_DOCKER_PORT
const server = createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World! I am the students api service.')
})
server.listen(PORT, HOSTNAME, () => {
  console.log(`Students API server running on port ${PORT}`)
})
