---
sidebar_position: 50
---

# 5. ShippingBoard Lite

Add a ramp dashboard to the original ShippingBoard Lite application while keeping its loading table, details dialog and styling. Start with four small React examples, then carry one pinned MobX application checkout through the full original assignment.

## Final result

![Original dashboard with loading cards grouped under ramps A, B and C. Each card shows a customer, a time window and pallet progress.](./img/img-05-01-final-result.jpeg)

The finished dashboard shows assigned loadings, pallet progress and ramp status; table rows and dashboard cards open the same details dialog. The [public demo](https://adam-zielonka.github.io/shippingboard-lite/) illustrates the result but can change independently of the pinned lesson source.

## Lessons

Lessons **5.1–5.4** use three fixed records, React state and the supplied ShippingBoard-inspired CSS. Each embedded starter includes the preceding solution; saved drafts stay with their own lesson. For exporting drafts, editor/local file paths and preview help, use [Course help](/course-help).

1. [5.1. Switch between board views](./05-shippingboard/01-view-switching.mdx)
2. [5.2. Filter loading status](./05-shippingboard/02-status-filter.mdx)
3. [5.3. Group loadings by ramp](./05-shippingboard/03-ramp-groups.mdx)
4. [5.4. Explain empty ramps and ramp status](./05-shippingboard/04-empty-and-status.mdx)

<span id="worked-continuation-upgrade-the-original-shippingboard-lite" />

## Original application

Lessons **5.5–5.15** are the main project: work in one separate checkout of [ShippingBoard Lite at `3634bcb9a1ee`](https://github.com/adam-zielonka/shippingboard-lite/tree/3634bcb9a1ee0ecf8bd9e956550970ff159a6c99), keeping each stage’s edits. It uses eleven loading models, MobX and Blueprint 4, not the mini editor’s `App.tsx`. Start at 5.5 for the exact local/online setup. Earlier overview section links below now lead to the extracted lessons.

5. <span id="1-prepare-and-inspect-the-original-workspace" /><span id="preparing-workspace" />[5.5. Prepare the original application](./05-shippingboard/05-original-workspace.mdx)
6. <span id="2-give-the-ui-store-a-view-and-connect-the-header" /><span id="store-info-about-view" /><span id="creating-buttons-for-view-changing" />[5.6. Share view state with the header](./05-shippingboard/06-shared-view.mdx)
7. <span id="3-switch-the-content-before-building-the-dashboard" /><span id="switching-between-views" />[5.7. Switch the original content](./05-shippingboard/07-content-switch.mdx)
8. <span id="4-restore-the-view-from-the-url-without-losing-loading-links" /><span id="add-view-to-url-params" />[5.8. Restore view and loading links](./05-shippingboard/08-view-url.mdx)
9. <span id="5-render-the-existing-ramps-with-their-original-styles" /><span id="create-rampbox" />[5.9. Render the original ramp shells](./05-shippingboard/09-ramp-shells.mdx)
10. <span id="6-build-one-loading-card-from-the-original-model" /><span id="create-loadingbox" />[5.10. Build a loading card](./05-shippingboard/10-loading-card.mdx)
11. <span id="7-derive-each-ramps-own-loadings" />[5.11. Derive ramp assignments](./05-shippingboard/11-ramp-assignments.mdx)
12. <span id="8-open-the-existing-details-dialog-from-a-card" />[5.12. Open shared loading details](./05-shippingboard/12-card-details.mdx)
13. <span id="9-derive-ramp-status-and-apply-the-original-colours" /><span id="add-status-to-rampbox" />[5.13. Derive ramp status](./05-shippingboard/13-ramp-status.mdx)
14. <span id="10-show-occupancy-and-intent-in-the-existing-assignment-dialog" /><span id="add-ramp-status-and-quantity-to-content-details" />[5.14. Show occupancy in the dialog](./05-shippingboard/14-dialog-occupancy.mdx)
15. <span id="11-verify-the-complete-continuation" />[5.15. Verify the complete board](./05-shippingboard/15-complete-board.mdx)

<span id="official-references" />References now accompany the concept in each lesson.
