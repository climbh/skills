# Skills

Monorepo for reusable Agent Skills.

## Structure

```text
skills/
  <skill-name>/
    SKILL.md
    agents/
    references/
    scripts/
scripts/
outputs/
```

Keep each directory under `skills/` independently installable. Do not add root-repository documentation or package metadata inside a skill unless the skill itself needs it.

## Commands

```bash
pnpm skills:list
pnpm skills:validate
pnpm skills:package
```

- `pnpm skills:list`: list discovered skills and descriptions.
- `pnpm skills:validate`: validate every skill's structure, frontmatter, metadata, and local Markdown links.
- `pnpm skills:package`: validate and create one zip per skill in `outputs/`.

## Add A Skill

Initialize new skills directly under `skills/`:

```bash
python3 "$HOME/.codex/skills/.system/skill-creator/scripts/init_skill.py" \
  my-skill \
  --path ./skills \
  --resources references,scripts
```

Then run `pnpm skills:validate`.
