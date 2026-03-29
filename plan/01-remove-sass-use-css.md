# Plan 01: Remove Sass & Use Plain CSS

Sass usage in this project is minimal — only SCSS variables in one file and `//` single-line comments in three others. No nesting, mixins, `@extend`, or `.scss` imports exist. The migration is straightforward.

---

## Step 1 — Convert `GameHeader.vue`
This is the **only** file with real Sass features: four `$variables` (`$color1`, `$color2`, `$color3`, `$border`), of which only `$color2` is actually used in a CSS property.

- Remove the unused `$color1`, `$color3`, and `$border` variable declarations.
- Replace `$color2: rgb(46, 46, 112)` + `color: $color2` with either:
  - An inline literal: `color: rgb(46, 46, 112)`, or
  - A CSS custom property: `--color-header: rgb(46, 46, 112)` declared on the selector.
- Change `<style lang="scss" scoped>` → `<style scoped>`.

---

## Step 2 — Fix `//` comments in three files
`AnswersCircle.vue`, `MediNinja.vue`, and `MeditaionZone.vue` only use SCSS-style `//` single-line comments (not valid in plain CSS).

- Convert any comments worth keeping to `/* */` block comments, or delete them entirely (they are all commented-out code or notes).
- Change `<style lang="scss" scoped>` → `<style scoped>` in each file.

---

## Step 3 — Remove `lang="scss"` from remaining files
The following files use zero Sass features — just remove the `lang="scss"` attribute:

| File | Change |
|------|--------|
| `BattleZone.vue` | `<style lang="scss" scoped>` → `<style scoped>` |
| `LetterInCircle.vue` | `<style lang="scss" scoped>` → `<style scoped>` |
| `PaintedBackGround.vue` | `<style lang="scss" scoped>` → `<style scoped>` |
| `Question.vue` | `<style lang="scss" scoped>` → `<style scoped>` |

---

## Step 4 — Remove `sass` from `package.json`
- Delete the `"sass": "^1.85.0"` line from `devDependencies`.
- Run `npm install` to update `package-lock.json`.
- No changes needed to `vite.config.js` (it has no Sass-specific configuration).

---

## Notes
- `$border: 12px` is declared but **never used** anywhere — delete it without replacement.
- Inlining the `$color2` value is simplest (only one use), but if theming is planned, consider moving it to a `:root` CSS custom property in `App.vue`.
- A `desaturate` class is referenced in `MediNinja.vue`'s template but never defined in any style block — pre-existing bug, unrelated to this migration.

