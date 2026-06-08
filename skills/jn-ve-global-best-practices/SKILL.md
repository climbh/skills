---
name: jn-ve-global-best-practices
description: Use when implementing, modifying, reviewing, or debugging Vue 3 interfaces that use the jn-ve-global component library, including GForm, GTable, GBaseModule, GUpload, GModal, GTree, GTabs, and related configuration types.
---

# JN-VE-GLOBAL Best Practices

Use the library's components and exported TypeScript types instead of rebuilding equivalent Element Plus behavior.

## Workflow

1. Inspect the target project's `package.json`, existing imports, and nearby usage before writing code.
2. Identify the smallest suitable component from [component-map.md](references/component-map.md).
3. Read that component's reference file. For broad questions or components without a dedicated file, search [JN-VE-GLOBAL组件库使用文档.md](references/JN-VE-GLOBAL组件库使用文档.md).
4. Follow the target project's established registration mode:
   - Use named imports for local/automatic registration projects.
   - Use the plugin and `jn-ve-global/dist/style.css` only when the app already uses full registration.
   - Do not assume every root export is included in full registration. In the inspected source, `GBaseModuleV2` and `GUploadFolder` are root exports but are not in the plugin component list.
5. Import public types from `jn-ve-global` with `import type`.
6. Preserve the component's expected reactive shape. Make mutable config/model objects reactive; leave immutable option lists plain when appropriate.
7. Verify uncertain props, events, slots, or exports against the installed package or source before relying on them.
8. Run the target project's typecheck and relevant tests after editing.

## API Verification

Treat bundled references as usage guidance for documented version `v3.8.2`, not as an infallible API schema.

When exact behavior matters:

1. Prefer the target project's installed `jn-ve-global` package because it matches the consuming app.
2. Otherwise inspect an available `jn-ve-global` source checkout supplied by the user or present in the current workspace.
3. Check the component's `index.ts`, `interface/` files, and `index.vue` props/emits.
4. Use only exports reachable from the package root unless the target project already relies on a documented subpath.

Do not invent props from the underlying Element Plus component. Confirm whether JN-VE-GLOBAL forwards them.

## Core Conventions

- Configure `GForm` through a reactive `FormProps` object with `model`, `formItems`, and `instance: null`.
- Put form control selection under `controlConfig.type`; put control-specific options under `controlConfig.props`.
- Configure `GTable` through `:config`, including `columns` and `data`; maintain `selectedRows` explicitly when cross-page selection is required.
- Prefer `GBaseModule` for standard search + actions + table + pagination list pages.
- Bind `GUpload` with both `v-model` and `v-model:fileList` when the caller needs file IDs and file metadata.
- Use stable enums/constants for `GTabs` values and other business states.
- Use explicit handlers and exported types; avoid `any` when the library exposes a suitable type.

## Common Pitfalls

- Do not confuse standalone template components with lowercase `GForm` control types such as `figureInput`, `selectTree`, and `upload`.
- Do not import `GSimpleUpload` from the package root without verification; it exists in the inspected source tree but is not exported by its root `index.ts`.
- Do not pass `GTable` top-level props when the local usage expects a single `config` object.
- Do not assume examples contain every required field. Validate copied examples against current types, especially upload file objects.
- Do not import internal files such as `jn-ve-global/packages/...` unless the consuming repository already depends on that path and it exists in its installed version.
- Do not mutate immutable shared config accidentally; use `reactive`, `ref`, or a local copy according to how the target component updates it.

## References

- Use [component-map.md](references/component-map.md) to select a component and locate its documentation.
- Use [README.md](references/README.md) for the documentation index and installation overview.
- Use dedicated component files in `references/` for detailed props, events, and examples.
- Use [JN-VE-GLOBAL组件库使用文档.md](references/JN-VE-GLOBAL组件库使用文档.md) for consolidated guidance and components without dedicated files.
