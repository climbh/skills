import { promises as fs } from 'node:fs'
import path from 'node:path'
import { discoverSkills, readFrontmatter } from './skill-utils.mjs'

const allowedFrontmatter = new Set(['name', 'description'])
const namePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const markdownLinkPattern = /\]\((?!https?:|mailto:|#)([^)#]+)(?:#[^)]+)?\)/g
let failures = 0

function fail(skillName, message) {
  failures += 1
  console.error(`FAIL ${skillName}: ${message}`)
}

async function walkMarkdown(directory) {
  const files = []
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory())
      files.push(...await walkMarkdown(fullPath))
    else if (entry.name.endsWith('.md'))
      files.push(fullPath)
  }
  return files
}

for (const skillDir of await discoverSkills()) {
  const directoryName = path.basename(skillDir)
  let skill

  try {
    skill = await readFrontmatter(skillDir)
  }
  catch (error) {
    fail(directoryName, error.message)
    continue
  }

  const { frontmatter } = skill
  const keys = Object.keys(frontmatter)

  if (keys.some(key => !allowedFrontmatter.has(key)))
    fail(directoryName, `frontmatter contains unsupported keys: ${keys.filter(key => !allowedFrontmatter.has(key)).join(', ')}`)
  if (!frontmatter.name || !frontmatter.description)
    fail(directoryName, 'frontmatter requires name and description')
  if (!namePattern.test(frontmatter.name ?? '') || frontmatter.name.length > 64)
    fail(directoryName, `invalid skill name: ${frontmatter.name}`)
  if (frontmatter.name !== directoryName)
    fail(directoryName, `directory name must match frontmatter name "${frontmatter.name}"`)
  if ((frontmatter.description ?? '').length > 1024)
    fail(directoryName, 'description exceeds 1024 characters')

  const agentFile = path.join(skillDir, 'agents', 'openai.yaml')
  try {
    const agentMetadata = await fs.readFile(agentFile, 'utf8')
    if (!agentMetadata.includes(`$${frontmatter.name}`))
      fail(directoryName, 'agents/openai.yaml default prompt must mention the skill name')
  }
  catch {
    fail(directoryName, 'agents/openai.yaml is missing')
  }

  for (const markdownFile of await walkMarkdown(skillDir)) {
    const content = await fs.readFile(markdownFile, 'utf8')
    for (const match of content.matchAll(markdownLinkPattern)) {
      const linkedFile = path.resolve(path.dirname(markdownFile), decodeURIComponent(match[1]))
      try {
        await fs.access(linkedFile)
      }
      catch {
        fail(directoryName, `${path.relative(skillDir, markdownFile)} links to missing file ${match[1]}`)
      }
    }
  }

  if (!failures)
    console.log(`PASS ${directoryName}`)
}

if (failures) {
  console.error(`\n${failures} validation failure(s)`)
  process.exit(1)
}

console.log('\nAll skills are valid')
