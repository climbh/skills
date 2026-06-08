import { promises as fs } from 'node:fs'
import path from 'node:path'

export const rootDir = path.resolve(import.meta.dirname, '..')
export const skillsDir = path.join(rootDir, 'skills')
export const outputsDir = path.join(rootDir, 'outputs')

export async function discoverSkills() {
  const entries = await fs.readdir(skillsDir, { withFileTypes: true })
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => path.join(skillsDir, entry.name))
    .sort()
}

export async function readFrontmatter(skillDir) {
  const skillFile = path.join(skillDir, 'SKILL.md')
  const content = await fs.readFile(skillFile, 'utf8')
  const match = content.match(/^---\n([\s\S]*?)\n---/)

  if (!match)
    throw new Error('SKILL.md has invalid or missing frontmatter')

  const frontmatter = {}
  for (const line of match[1].split('\n')) {
    const field = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/)
    if (!field)
      throw new Error(`unsupported frontmatter line: ${line}`)

    frontmatter[field[1]] = field[2].replace(/^(['"])(.*)\1$/, '$2')
  }

  return { content, frontmatter }
}
