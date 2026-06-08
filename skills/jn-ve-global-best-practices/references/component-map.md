# Component Map

Use this map to choose a component before opening detailed documentation.

| Need | Prefer | Detailed reference |
|---|---|---|
| Standard list page with search, actions, table, pagination | `GBaseModule` or `GBaseModuleV2` | `GBaseModule.md`, consolidated guide |
| Config-driven dynamic form | `GForm` | `GForm.md` |
| Data table, selection, editing, pagination | `GTable` | `GTable.md` |
| Dialog or drawer | `GModal` | `GModal.md` |
| File upload, preview, download, chunk upload | `GUpload` | `GUpload.md` |
| Simple file upload | `GSimpleUpload` | consolidated guide/source; verify import path because it is not a root export in the inspected source |
| Folder upload | `GUploadFolder` | consolidated guide/source |
| File preview | `GFilePreview` | consolidated guide/source |
| Tree display/filter/selection | `GTree` | `GTree.md` |
| Tree value selection | `GSelectTree` / `GSelectTreeV2` | consolidated guide/source |
| Tabs with dynamic visibility | `GTabs` | `GTabs.md` |
| Icon rendering | `GIcon` | `GIcon.md` |
| Icon selection | `GIconPicker` | `GIconPicker.md` |
| Debounced button | `GDButton` | `GDButton.md` |
| Configured button group | `GButtonGroup` | `GButtonGroup.md` |
| Formatted numeric input | `GFigureInput` | `GFigureInput.md` |
| Collapse panels | `GCollapse` / `GCollapseItem` | consolidated guide/source |
| Transfer list or tree transfer | `GTransfer` / `GTransferTree` | consolidated guide/source |
| Chart | `GChart` / `GChartBasic` | consolidated guide/source |
| Rich text editing | `JnEditor` | consolidated guide/source |
| Information lookup/select/autocomplete | `GInfoSelect`, `GInfoSelectAll`, `GInfoAutocomplete` | consolidated guide/source |
| Irregular merged-cell table | `GIrregularTable` | consolidated guide/source |
| Address selection | `GAddress` | consolidated guide/source |
| Loading overlay | `GLodingShade` | consolidated guide/source |
| Drawer content layout | `GBaseDrawerContent` | consolidated guide/source |
| Hint/callout box | `GHintBox` | consolidated guide/source |

## Standalone Versus Form Controls

Use PascalCase components directly in templates. In `GForm.formItems`, select controls through lowercase/camelCase `controlConfig.type` values such as:

`input`, `inputNumber`, `figureInput`, `select`, `radio`, `radioButton`, `checkbox`, `checkBoxButton`, `switch`, `timePicker`, `timeSelect`, `datePicker`, `colorPicker`, `rate`, `slider`, `selectTree`, `selectTreeV2`, `upload`, `uploadFolder`, `address`, `iconPicker`, `infoSelect`, `infoSelectAll`, `infoAutocomplete`, and `jnEditor`.

Confirm the exact supported control names against the installed version before adding a less common control.

## Inspected Source Export Caveats

- Root `index.ts` exports `GBaseModuleV2` and `GUploadFolder`, but the plugin registration list does not include them.
- `GSimpleUpload` exists in the source tree, but its component `index.ts` is empty and it is not exported from root `index.ts`.
- Automatic resolver logic matches names beginning with `G`, `LG`, or `Jn`; matching a name does not prove that the package root actually exports it.
