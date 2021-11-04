import pg from 'pg'

const Pool = pg.Pool
const PORT: number | undefined = parseInt(<string>process.env.DB_DOCKER_PORT, 10)

const pool = new Pool({
  host: process.env.DB_HOST,
  port: PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

async function getClient () {
  const client = await pool.connect()
  const query = client.query
  const release = client.release

  const timeout = setTimeout(() => {
    console.error('A client has been checked out for more than 5 seconds!')
    console.log('Closing connection...')
    client.release()
  }, 5000)

  client.release = () => {
    clearTimeout(timeout)
    client.query = query
    client.release = release
    return release.apply(client)
  }

  return client
}

export { getClient }
