import fs from 'fs'

const fsPromises = fs.promises

async function listFiles (path: fs.PathLike) {
  try {
    return fsPromises.readdir(path)
  } catch (err) {
    console.error('Error occured while reading directory!', err)
  }
}

async function getFileContents (file: fs.promises.FileHandle | string | undefined, path: fs.PathLike) {
  try {
    return fsPromises.readFile(`${path}/${file}`, {
      encoding: 'utf-8'
    })
  } catch (err) {
    console.error('Error occured while reading file!', err)
  }
}

export { listFiles, getFileContents }
