import { createHash } from 'crypto';
import { hash as blake3hash } from 'blake3-wasm'
import { murmurHash as ohashMurmur, sha256 as ohashSha256, sha256base64 as ohashSha256Base64 } from "ohash";
import { run, bench, barplot, summary } from 'mitata';
import { createStorage } from 'unstorage';
import fsDriver from 'unstorage/drivers/fs'

// run with node --expose-gc benchmark.mjs

// Test data
const srcStorage = createStorage({
  driver: fsDriver({
    base: '../ui/docs/dist',
    ignore: ['.DS_Store']
  }),
})

const fileKeys = await srcStorage.getKeys()
const filesToDeploy = fileKeys.filter(fileKey => {
  if (fileKey.startsWith('.wrangler:')) return false
  if (fileKey.startsWith('node_modules:')) return false
  if (fileKey === 'wrangler.toml') return false
  if (fileKey === '.dev.vars') return false
  if (fileKey.startsWith('database:migrations:')) return false
  return true
})

// Hashing functions
const hashMethods = {
  md5: (data) => createHash('md5').update(data).digest('hex'),
  sha1: (data) => createHash('sha1').update(data).digest('hex'),
  sha256: (data) => createHash('sha256').update(data).digest('hex'),
  sha512: (data) => createHash('sha512').update(data).digest('hex'),
  blake2b512: (data) => createHash('blake2b512').update(data).digest('hex'),
  blake2s256: (data) => createHash('blake2s256').update(data).digest('hex'),
  blake3: (data) => blake3hash(data).toString('hex'),
  ohashMurmur: (data) => ohashMurmur(data),
  ohashSha256: (data) => ohashSha256(data),
  ohashSha256Base64: (data) => ohashSha256Base64(data),
}

barplot(() => {
  summary(() => {
    Object.entries(hashMethods).forEach(([name, fn]) => {
      bench(`${name}`, function* (state) {
        yield async () => {
          for (const fileKey of filesToDeploy) {
            const data = await srcStorage.getItemRaw(fileKey)
            const fileContentBase64 = data.toString('base64')
            const hash = fn(fileContentBase64)
          }
        }
      })
    })
  })
})

await run();
