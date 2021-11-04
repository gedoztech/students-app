import { getClient } from './db-connection'
import { listFiles, getFileContents } from '../fs-utils'

const migrationsPath = process.cwd() + '/../db/migrations'

async function getOutstandingMigrations (migrations: any[]) {
  const files: string[] | undefined = await listFiles(migrationsPath)
  return await Promise.all(
    (files as string[])
      .filter((file) => file.split('.')[1] === 'sql')
      .filter((file) => !migrations.includes(file))
      .map(async (file) => ({
        file,
        query: await getFileContents(file, migrationsPath)
      }))

  )
}

async function migrate () {
  const client = await getClient()

  let existingMigrations = []
  try {
    const result = await client.query('SELECT * FROM public.migrations')
    existingMigrations = result.rows.map(r => r.file)
  } catch {
    console.warn('First migration')
  }

  const outstandingMigrations = await getOutstandingMigrations(
    existingMigrations
  )

  if (outstandingMigrations.length > 0) {
    try {
      await client.query('BEGIN')
      for (const migration of outstandingMigrations) {
        await client.query((migration as { query: { toString: () => any }; file: any }).query.toString())
        await client.query('INSERT INTO public.migrations (file) VALUES ($1)', [
          migration.file
        ])
      }
      await client.query('COMMIT')
      console.log('The migration was performed successfully.')
      console.log('Wait a moment, the connection is being closed.')
    } catch (err) {
      await client.query('ROLLBACK')
    } finally {
      client.release()
    }
  } else {
    console.log('No migration to be performed.')
    console.log('Wait a moment, the connection is being closed.')
  }
}

try {
  migrate()
} catch (err) {
  console.log('Error occured while migrating.', err)
}
