import { execFileSync } from 'node:child_process'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { discoverSkills, outputsDir, rootDir } from './skill-utils.mjs'

execFileSync(process.execPath, [path.join(rootDir, 'scripts', 'validate-skills.mjs')], {
  stdio: 'inherit',
})

await fs.mkdir(outputsDir, { recursive: true })

for (const skillDir of await discoverSkills()) {
  const skillName = path.basename(skillDir)
  const outputFile = path.join(outputsDir, `${skillName}.zip`)

  await fs.rm(outputFile, { force: true })
  execFileSync('zip', ['-qr', outputFile, skillName], {
    cwd: path.dirname(skillDir),
    stdio: 'inherit',
  })
  console.log(`PACK ${path.relative(rootDir, outputFile)}`)
}
