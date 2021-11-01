import { createServer } from 'http'
const HOSTNAME = 'students-ui'
const PORT = process.env.UI_DOCKER_PORT
const server = createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World! I am the students ui service.')
})
server.listen(PORT, HOSTNAME, () => {
  console.log(`Students UI server running on port ${PORT}`)
})
