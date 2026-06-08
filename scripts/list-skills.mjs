import path from 'node:path'
import { discoverSkills, readFrontmatter, rootDir } from './skill-utils.mjs'

for (const skillDir of await discoverSkills()) {
  const { frontmatter } = await readFrontmatter(skillDir)
  console.log(`${frontmatter.name}\t${frontmatter.description}`)
}

console.log(`\nSkills root: ${path.relative(process.cwd(), path.join(rootDir, 'skills')) || '.'}`)
