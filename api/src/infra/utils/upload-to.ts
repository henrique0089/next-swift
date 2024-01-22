import { AppError } from '@app/errors/app-error'
import { SavedMultipartFile } from '@fastify/multipart'
import { randomBytes } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

const pump = promisify(pipeline)
const allowedExtnames = ['.png', '.jpg', '.jpeg']

export async function uploadTo(data: SavedMultipartFile, folder: string) {
  const ext = path.extname(data.filename)

  if (!allowedExtnames.includes(ext)) {
    throw new AppError('invalid file extension!')
  }

  const fileHash = randomBytes(8).toString('hex')
  const filename = `${fileHash}${ext}`
  const uploadFolder = path.resolve(
    __dirname,
    '..',
    './uploads',
    folder,
    filename,
  )

  await pump(data.file, fs.createWriteStream(uploadFolder))

  return {
    filename,
  }
}
