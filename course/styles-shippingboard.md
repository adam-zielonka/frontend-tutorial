# ShippingBoard Lite style provenance

Chapter 05 restores the appearance of the original ShippingBoard Lite exercise,
rather than applying the generic course card theme.

## References

- Historical training instructions: `git show 30e83a2:docs/ch-05-00-shippingboard-lite.md`.
- Original screenshots: `docs/img/img-05-01-final-result.jpeg` (ramp dashboard) and
  `docs/img/img-05-02-what-we-have.jpeg` (loading table).
- Original application: `/root/projekty/shippingboard-lite` (read only),
  [upstream repository](https://github.com/adam-zielonka/shippingboard-lite).
  Historical SCSS at `5ece5c5416bf0b1a28588789cfd12d9a4428ceaa` and current
  responsive adjustments at `c834ee100f5517051c2038e96e29d4252e56ee0f`:
  `src/App.scss`, `src/components/Content.scss`, `src/components/Ramp.scss`,
  `src/components/LoadingsTable.scss`; navbar and card appearance originally
  came from Blueprint (`src/main.scss`).

## What is preserved

The supplied `/styles.css` and presentation markup use the original `App`,
`Header`, `Content`, `Ramp`, `Loading`, and `LoadingsTable` selectors. The navbar
is white with joined, outlined blue view buttons. The gray board uses 10px gaps,
rectangular ramp cards, white ramp headers, inset shadows and the original
45-degree `#f5f5f7` / `#e4e4e4` hatch. Loading cards retain the 180px basis, gray
ID header, bold customer and separated status footer. The table retains compact
rows, gray IDs, gray hover and separators, and blue ramp tags. Loading and done
statuses use blue and green stripes, respectively.

The final exercise maps its existing ramp status to the original translucent
background colors: Complete = green (`rgba(31, 177, 31, .315)`), Loading = yellow
(`rgba(204, 169, 26, .315)`), Waiting = red
(`rgba(204, 26, 26, .315)`). Available retains the neutral hatch. Labels identify
every status independently of color. Earlier steps keep neutral ramp bodies
until the learner implements the business status in step 04.

## Adaptations for the current lessons

- Plain CSS supplies the relevant Blueprint appearance; no Blueprint, Sass,
  icon package, remote font, or extra dependency is required.
- The existing Loadings/Ramps labels, default view, filter, live count and three
  fixed records remain. The original Add loading action, dialogs, dates, times,
  operator, addresses and pallet quantities are outside these lessons.
- The table remains a semantic table with the existing three columns. The ID
  and customer share Shipment because the simplified fixture has fewer fields.
  A focusable local scroll region contains overflow; headings/caption remain
  accessible without introducing extra visual headings absent from the original.
- Stripes indicate the categorical loading status, **not** a numeric percentage:
  the fixture has no picked/pallet counts. Waiting is gray, loading blue, done
  green; the accompanying text remains visible.
- The original `main` inside each ramp/loading is a `div` here, preserving one
  page main landmark. `ramp-loadings` names that styled ramp body. Ramp status
  text sits in the header, as in the current original application.
- Navbar controls and cards wrap, ramp cards can shrink below their basis and
  customer text wraps. Loading cards use a minimum height rather than clipping
  text into the original fixed-height proportions. The mobile adjustments keep
  the original visual treatment while accommodating narrow embedded previews.
- Every starter and solution supplies identical CSS. Scaffold ramps already
  have the same shell, but assignments, empty-state explanations and derived
  ramp status still arrive only in their respective steps. Only `/App.tsx`
  differs between each starter and solution; focus files and dependencies stay
  unchanged.

Run `pnpm course:assemble` after editing chapter sources. See the
[development guide](../DEVELOPMENT.md) for checkpoint release instructions.

## Validation

- Validated the chapter JSON and all chapter source file maps with
  `validateLessons`, without regenerating the assembled manifest.
- Compared TypeScript syntax trees against the previous chapter sources:
  imports, variable declarations, data, event handlers and existing keyed/value
  expressions are unchanged. Metadata and editable-file constraints are intact;
  each later starter still exactly matches the preceding solution.
- Exported all four starter/solution pairs with `projectFiles`, installed their
  existing frozen lockfile, then ran `tsc --noEmit && vite build --sourcemap`
  for all eight projects. Each emitted map contains the matching lesson source.
- Server-rendered all 64 view/filter combinations across those eight variants;
  checked row/card counts, scaffold progression, one main landmark, final ramp
  status labels/tints, empty-state messages and an additional Complete fixture.
- No browser verification was performed. Narrow-layout safeguards were reviewed
  in CSS; the original reference screenshots were inspected locally.
