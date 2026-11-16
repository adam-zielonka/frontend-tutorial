---
sidebar_position: 50
---

# 5. ShippingBoard Lite

Compose a small board from the fixed loading and ramp fixtures. React state holds view/filter choices; visible rows and ramp status are derived from the records. Each mini-lesson carries the previous solution forward.

The examples isolate view and ramp concepts from the [original ShippingBoard Lite project](https://github.com/adam-zielonka/shippingboard-lite) without its backend or older UI dependencies. The fixture is intentionally local: it does not implement persistence, editing assignments, or a production shipping system.

## Lessons

1. [Switch between board views](./05-shippingboard/01-view-switching.mdx) — Connect view selection to two presentations of the same data.
2. [Filter loading status](./05-shippingboard/02-status-filter.mdx) — Derive visible rows from a controlled status selector.
3. [Group loadings by ramp](./05-shippingboard/03-ramp-groups.mdx) — Render each ramp with its matching visible assignments.
4. [Explain empty ramps and ramp status](./05-shippingboard/04-empty-and-status.mdx) — Distinguish an available ramp from a filter with no matches.

In a local export, editor `/App.tsx` is `src/App.tsx`; other editor paths likewise live under `src` unless identified as public files. Work in order. Each lesson has its own starter, focused editor, and preview. The previous solution forms the next starter within the chapter; your saved edits remain scoped to the lesson where you made them.

## Official references

[React rendering lists](https://react.dev/learn/rendering-lists), [conditional rendering](https://react.dev/learn/conditional-rendering), [choosing state structure](https://react.dev/learn/choosing-the-state-structure).

## Worked continuation: upgrade the original ShippingBoard Lite

The four mini-lessons above are a small, independent React exercise. Continue here when you want to perform the original assignment: add a ramp dashboard to the **existing ShippingBoard Lite application**, while keeping its loading table and details dialog. These edits belong in a separate checkout of that project, **not** in the mini editor's `App.tsx`.

The original starting table and intended dashboard are:

![Original table](./img/img-05-02-what-we-have.jpeg)
![Original ramp dashboard](./img/img-05-01-final-result.jpeg)

The [public demo](https://adam-zielonka.github.io/shippingboard-lite/) illustrates the project; it can change independently of this lesson. Our reproducible starting point is the `create-ramp-view` branch at commit [`3634bcb9a1ee0ecf8bd9e956550970ff159a6c99`](https://github.com/adam-zielonka/shippingboard-lite/tree/3634bcb9a1ee0ecf8bd9e956550970ff159a6c99). This checkpoint retains the old component API and styling even though its tooling dependencies have been updated since the original lesson.

### 1. Prepare and inspect the original workspace

Use Node.js 24 and an installed `pnpm` command. The checkpoint has a version 6 pnpm lockfile; invoking pnpm 8 explicitly keeps that dependency resolution. In your development directory, create a new checkout:

```shell
node --version
pnpm --version
git clone --branch create-ramp-view https://github.com/adam-zielonka/shippingboard-lite.git shippingboard-lite-ramp-lesson
cd shippingboard-lite-ramp-lesson
git switch --detach 3634bcb9a1ee0ecf8bd9e956550970ff159a6c99
git switch -c lesson/ramp-dashboard
pnpm dlx pnpm@8.15.9 install --frozen-lockfile
pnpm dlx pnpm@8.15.9 run dev
```

Open the local address printed by Vite, normally `http://localhost:5173`. The command is `run dev`; the old tutorial's `npm dev` was incorrect. An optional online starting point is [StackBlitz at the same commit](https://stackblitz.com/github/adam-zielonka/shippingboard-lite/tree/3634bcb9a1ee0ecf8bd9e956550970ff159a6c99); use the local workflow above for the verified build path. Do not start from today's `main`: its components and dependencies differ.

**Check before editing:** you should see a table with eleven loadings, an **Add loading** button and a details dialog when you click a table row. Close that dialog before continuing. In a second terminal in the same checkout, establish the baseline:

```shell
pnpm dlx pnpm@8.15.9 run build
```

This script runs TypeScript and then Vite. Repeat it after each numbered change below; these are edits to the original app, not exports from a mini-lesson.

Read these existing files before changing them:

| File | What is already there |
| --- | --- |
| `src/store/Store.ts` | One `store` singleton; initializes customers, ramps, loadings, then `ui.init()`; exposes `window.store` for inspection. |
| `src/store/UI.ts` | `makeAutoObservable`, a `View` type, loading-dialog actions, URL restoration of the selected loading and an `addQueryParam` helper. The `view` field and view actions are missing. |
| `src/store/Loading.ts` | A `Loading` class with dates, customer lookup, pallet counters, progress getters and ramp actions. |
| `src/store/Ramp.ts` | A `Ramp` class with ID, description and `makeAutoObservable`. Its extension is **`.ts`**, not `.tsx`. |
| `src/api/api.ts`, `src/api/parse.ts`, `src/api/fakeApi.ts` | Synchronous local data mapped into class instances; loading ramp IDs resolve to objects in `store.ramps`. No backend setup is needed. |
| `src/components/Header.tsx`, `Content.tsx`, `Details.tsx` | Existing navbar, table selection point and assignment dialog. |
| `src/components/Content.scss`, `Ramp.scss`, `Details.scss` | Original layout, ramp/card styles and dialog styles. `Ramp.scss` exists but is not yet imported. |

Unlike the mini app's plain records and local `useState`, this application uses observable class instances and shared UI state. `loading.ramp` is a `Ramp` object or `undefined`, not a ramp ID string. It uses React 18, MobX 6 and **Blueprint `@blueprintjs/core` 4.20.2** from the lockfile. Keep Blueprint 4 for this exercise: the existing Sass selectors include `.bp4-card` and `.bp4-dialog`. Upgrading Blueprint or copying components from current `main` would be a separate migration.

### 2. Give the UI store a view and connect the header

Keep the existing imports, URL helper, constructor and loading-dialog code in `src/store/UI.ts`. The checkpoint already declares `type View = "dashboard" | "loadings"`; keep that one declaration. Add the following members **inside** `export class UI`, alongside `selectedLoading` and the existing methods:

```ts title="src/store/UI.ts — add class members"
view: View = "dashboard";

get isDashboardOpen(): boolean {
  return this.view === "dashboard";
}

get isLoadingsOpen(): boolean {
  return this.view === "loadings";
}

openDashboard = () => {
  this.view = "dashboard";
};

openLoadings = () => {
  this.view = "loadings";
};
```

Only `view` stores a choice. The getters derive booleans instead of maintaining two flags that could both be true. The existing constructor's `makeAutoObservable(this)` makes fields observable, getters computed and these functions actions; no decorators or second store are needed. See [MobX automatic annotations](https://mobx.js.org/observable-state.html#makeautoobservable).

Replace `src/components/Header.tsx` with this complete file:

```tsx title="src/components/Header.tsx"
import { Alignment, Button, ButtonGroup, Navbar } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import { Loading } from "../store/Loading";
import { store } from "../store/Store";

export const Header = observer(() => {
  const { ui } = store;

  return <Navbar>
    <Navbar.Group align={Alignment.LEFT}>
      <Navbar.Heading>ShippingBoard Lite</Navbar.Heading>
      <Navbar.Divider />
      <ButtonGroup>
        <Button outlined icon="dashboard" text="Dashboard" intent="primary"
          onClick={ui.openDashboard} active={ui.isDashboardOpen} />
        <Button outlined icon="th" text="Loadings" intent="primary"
          onClick={ui.openLoadings} active={ui.isLoadingsOpen} />
      </ButtonGroup>
    </Navbar.Group>
    <Navbar.Group align={Alignment.RIGHT}>
      <ButtonGroup minimal>
        <Button icon="add" text="Add loading" intent="primary"
          onClick={() => ui.openLoadingDialog(Loading.create())} />
      </ButtonGroup>
    </Navbar.Group>
  </Navbar>;
});
```

`observer` subscribes the header to the observable values it reads, so the active button follows the store. Pass the action to `onClick`; calling `ui.openDashboard()` while rendering would change state before a click. The existing **Add loading** action remains intact. See [MobX React integration](https://mobx.js.org/react-integration.html).

**Check:** clicking the two view buttons changes their active appearance. The table stays visible for now because `Content` still always renders it. A fresh reload selects Dashboard by default.

### 3. Switch the content before building the dashboard

Replace `src/components/Content.tsx` with this complete, deliberately small intermediate version:

```tsx title="src/components/Content.tsx — view switch"
import { observer } from "mobx-react-lite";
import { store } from "../store/Store";
import { LoadingsTable } from "./LoadingsTable";
import "./Content.scss";

export const Content = observer(() => {
  const { ui } = store;

  if (ui.isLoadingsOpen) {
    return <LoadingsTable />;
  }

  return <div className="Content">Ramps will appear here.</div>;
});
```

The early return keeps the working table as one branch. The other branch will become the ramp board. `App.tsx` already renders `Header`, `Content` and `Details`; leave it unchanged so the same dialog can serve both views.

**Check:** Loadings shows the original table, Dashboard shows the temporary sentence, and opening a table row still shows its details. View selection now changes both the header and content.

### 4. Restore the view from the URL without losing loading links

A link such as `/?view=loadings&loading=0007703` should select the table **and** open the existing loading dialog after reload. Restore state first, then observe later changes. Do not replace `init` with a fragment that discards its existing loading lookup or its loading reaction.

Replace `src/store/UI.ts` with this complete version, including the view members from step 2:

```ts title="src/store/UI.ts — complete URL integration"
import { makeAutoObservable, reaction } from "mobx";
import { Loading } from "./Loading";
import { store } from "./Store";

type View = "dashboard" | "loadings";

function addQueryParam(name: string, value: string, defaultValue: string) {
  const url = new URL(window.location.href);
  if (value !== defaultValue) {
    url.searchParams.set(name, value);
  } else {
    url.searchParams.delete(name);
  }
  window.history.pushState(null, "", url.pathname + url.search + url.hash);
}

export class UI {
  view: View = "dashboard";
  selectedLoading?: Loading;

  constructor() {
    makeAutoObservable(this);
  }

  init = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const view = urlSearchParams.get("view");
    this.view = view === "loadings" ? "loadings" : "dashboard";

    const loadingId = urlSearchParams.get("loading");
    if (loadingId) {
      const loading = store.loadings.find(l => l.id === loadingId);
      if (loading) {
        this.selectedLoading = loading;
      }
    }

    reaction(
      () => this.view,
      view => addQueryParam("view", view, "dashboard"),
    );
    reaction(
      () => this.selectedLoading,
      loading => addQueryParam("loading", loading?.id ?? "", ""),
    );
  };

  get isDashboardOpen(): boolean {
    return this.view === "dashboard";
  }

  get isLoadingsOpen(): boolean {
    return this.view === "loadings";
  }

  get isLoadingDialogOpen(): boolean {
    return !!this.selectedLoading;
  }

  openDashboard = () => {
    this.view = "dashboard";
  };

  openLoadings = () => {
    this.view = "loadings";
  };

  openLoadingDialog = (loading: Loading) => {
    this.selectedLoading = loading;
  };

  closeLoadingDialog = () => {
    this.selectedLoading = undefined;
  };
}
```

The URL value is untrusted text: only `loadings` selects that view; missing, `dashboard` or unknown values select the default dashboard. Do not cast arbitrary input to `View`. The loading lookup still ignores unknown loading IDs. `Store.init` already creates loadings before calling `ui.init`, so the selected instance can be found.

A [`reaction`](https://mobx.js.org/reactions.html#reaction) tracks its first function and runs the second when that value changes. We keep its default of **not writing immediately**, so initialization does not overwrite a deep link. Later, selecting Loadings writes `view=loadings`, selecting Dashboard removes the default parameter, and closing details removes `loading`. The helper still uses the checkpoint's `pushState` approach, with a small correction: building from a full URL preserves its hash and avoids a stray `?` when the query is empty. It also retains unrelated query parameters. See [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) and [History.pushState](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState).

This is startup restoration plus state-to-URL synchronization, not a router: there is no `popstate` listener, so Back/Forward alone does not restore the UI. These reactions belong to the application-lifetime singleton, initialized once by `Store.ts`; do not call `ui.init()` from a React render or effect. If you later give the store a shorter lifetime, retain and call the reaction disposers when disposing that store, as described in [MobX reaction disposal](https://mobx.js.org/reactions.html#always-dispose-of-reactions).

**Check:** load `/?view=loadings&loading=0007703&keep=yes#dock` directly. You should see the table and dialog for `0007703`. Close it: `loading` disappears while `view`, `keep` and `#dock` remain. Select Dashboard: `view` disappears and the placeholder returns. Reload `/?view=unknown`: the dashboard is selected, without accepting `unknown` as store state. The unused invalid parameter may remain until a later view change because initialization deliberately does not write the URL.

### 5. Render the existing ramps with their original styles

Create `src/components/RampBox.tsx` with this complete intermediate component:

```tsx title="src/components/RampBox.tsx — ramp shell"
import { Card, Elevation } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import { Ramp } from "../store/Ramp";
import "./Ramp.scss";

export const RampBox = observer(({ ramp }: { ramp: Ramp }) => {
  return <Card className="Ramp" elevation={Elevation.ONE}>
    <header>{ramp.description}</header>
    <main>Loadings will appear here.</main>
  </Card>;
});
```

Import the **existing** `Ramp.scss`, not a new stylesheet. It styles both `.Ramp` and its nested `.Loading` cards. The Blueprint Card supplies its own `.bp4-card` class; our `className="Ramp"` activates the original rules alongside it. The checkpoint also already imports Blueprint's base stylesheet in `src/main.scss`. Keep all those styles unchanged. The [Blueprint 4 Card source](https://github.com/palantir/blueprint/blob/%40blueprintjs%2Fcore%404.20.2/packages/core/src/components/card/card.tsx) documents the `elevation` and `interactive` props used here and below.

Replace `src/components/Content.tsx` with the complete version that passes actual ramp models:

```tsx title="src/components/Content.tsx — ramp mapping"
import { observer } from "mobx-react-lite";
import { store } from "../store/Store";
import { LoadingsTable } from "./LoadingsTable";
import { RampBox } from "./RampBox";
import "./Content.scss";

export const Content = observer(() => {
  const { ui, ramps } = store;

  if (ui.isLoadingsOpen) {
    return <LoadingsTable />;
  }

  return <div className="Content">
    {ramps.map(ramp => <RampBox key={ramp.id} ramp={ramp} />)}
  </div>;
});
```

The stable model ID is the React key; the visible label is `description`. Do not replace `store.ramps` with copies of the mini fixture. Each component receives the same model instance used by the loading assignments.

**Check:** Dashboard shows seven styled ramp shells labelled A through G, with the existing striped background. Loadings still shows all eleven rows. If the cards are unstyled, check the `Ramp.scss` import and confirm Blueprint 4 is installed before changing CSS.

### 6. Build one loading card from the original model

Create `src/components/LoadingBox.tsx`:

```tsx title="src/components/LoadingBox.tsx"
import { Card, Elevation, ProgressBar } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import { Loading } from "../store/Loading";

export const LoadingBox = observer(({ loading }: { loading: Loading }) => {
  const { customer } = loading;

  return <Card className="Loading" elevation={Elevation.TWO} interactive>
    <header>
      <div>{loading.id}</div>
    </header>
    <main>
      <div className="details">
        {loading.start.date}
        <div>
          <span>{loading.start.time}</span>–{loading.end.time}
        </div>
      </div>
      <div className="customer">
        {customer && <>
          <div className="name">{customer.name}</div>
          <div className="city">{customer.country}, {customer.city}</div>
          <div className="id">{customer.id.replace(/^0+/, "")}</div>
        </>}
      </div>
    </main>
    <footer>
      <div><b>{loading.picked}</b> of <b>{loading.pallets}</b></div>
      <ProgressBar animate={false} value={loading.loadedRatio}
        intent={loading.isLoaded ? "success" : "primary"} />
    </footer>
  </Card>;
});
```

Use the model's existing presentation getters rather than interpreting raw API fields in the component:

| Card value | Existing model mapping |
| --- | --- |
| Loading ID | `loading.id`, originally `loading_id` in `fakeApi.ts`. |
| Date and time window | `loading.start.date`, `start.time` and `end.time`, formatted by `DateTime`. |
| Customer | `loading.customer`, resolved through the first delivery's `ship_to` relationship. Guard it because a loading can have no deliveries. |
| Customer name, location and ID | `customer.name`, `country`, `city`, `id`; remove leading zeroes only in the displayed customer ID. |
| Pallet counts | `picked` from `picked_hus`, and `pallets` from the API's total. The card reads picked **of** total. |
| Progress | `loadedRatio`: `picked / pallets`, with `0` when the total is zero; `isLoaded` requires a positive total and exact equality. |

Blueprint's [`ProgressBar` value is a ratio from 0 to 1](https://github.com/palantir/blueprint/blob/%40blueprintjs%2Fcore%404.20.2/packages/core/src/components/progress-bar/progressBar.tsx), not a percentage from 0 to 100. We pass the existing numeric getter, turn off animation and use success intent only for a completed loading. This differs from the mini app's categorical status stripe.

For a short visual check before connecting the relationship, add these imports to `RampBox.tsx`:

```tsx title="src/components/RampBox.tsx — temporary imports"
import { store } from "../store/Store";
import { LoadingBox } from "./LoadingBox";
```

Then replace its entire `<main>Loadings will appear here.</main>` with:

```tsx title="src/components/RampBox.tsx — temporary single loading"
<main>
  <LoadingBox loading={store.loadings[0]} />
</main>
```

The pinned data guarantees a first loading; this is a temporary component check, not the final assignment logic.

**Check:** every ramp temporarily shows the **same** `0007701` card: Militech, US/Washington, D.C., customer ID `771996`, `2 of 2` and a full success bar. The dates follow the local current day and the time window is 06:00–09:00. The `.Loading` styles apply because the card is inside `.Ramp`. Clicking is not connected yet. If you see duplicated cards, that is expected at this intermediate step; fix the relationship next.

### 7. Derive each ramp's own loadings

Replace `src/store/Ramp.ts` with this complete intermediate model:

```ts title="src/store/Ramp.ts — assigned loadings"
import { makeAutoObservable } from "mobx";
import { Loading } from "./Loading";
import { store } from "./Store";

export class Ramp {
  constructor(
    public id: string,
    public description: string,
  ) {
    makeAutoObservable(this);
  }

  get loadings(): Loading[] {
    return store.loadings.filter(loading => loading.ramp === this);
  }
}
```

`FromResponse.ramp` in `src/api/parse.ts` resolves each fixture's ramp ID to a `store.ramps` instance. The dialog's existing `setRamp` action assigns one of those same objects. That is why reference equality works here. Unassigned loadings have `ramp === undefined` and stay in the table; they do not belong to an invented extra ramp. The fallback for an unknown API ramp ID is outside this fixture and this dashboard exercise.

Do not store another mutable array of assignments on each ramp. The getter derives it from the single source, `store.loadings`. `makeAutoObservable` makes it computed, and an observing component updates when a loading's assignment changes. See [MobX computed values](https://mobx.js.org/computeds.html).

Replace `src/components/RampBox.tsx` completely, removing the temporary `store` import and single-loading example:

```tsx title="src/components/RampBox.tsx — assigned cards"
import { Card, Elevation } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import { Ramp } from "../store/Ramp";
import { LoadingBox } from "./LoadingBox";
import "./Ramp.scss";

export const RampBox = observer(({ ramp }: { ramp: Ramp }) => {
  return <Card className="Ramp" elevation={Elevation.ONE}>
    <header>{ramp.description}</header>
    <main>
      {ramp.loadings.map(loading =>
        <LoadingBox key={loading.id} loading={loading} />
      )}
    </main>
  </Card>;
});
```

**Check:** A, F and G are empty; B has `0007701`; C has `0007702` and `0007703`; D has `0007704`–`0007706`; E has `0007707` and `0007708`. The three unassigned loadings `0007709`–`0007711` remain accessible through Loadings. Empty ramps retain their header and striped body, rather than disappearing.

### 8. Open the existing details dialog from a card

In `src/components/LoadingBox.tsx`, add this import:

```tsx title="src/components/LoadingBox.tsx — store import"
import { store } from "../store/Store";
```

Replace only its opening `return <Card ...>` line with these lines; keep the header, main, footer and closing tags from step 6:

```tsx title="src/components/LoadingBox.tsx — click handler"
return <Card className="Loading" elevation={Elevation.TWO} interactive
  onClick={() => store.ui.openLoadingDialog(loading)}>
```

`interactive` provides Blueprint's card interaction styling; `onClick` supplies the behavior. Pass the existing model to the same action used by a table row. Do not create another dialog or another selected-loading state.

**Check:** clicking `0007703` on C opens its details and writes `loading=0007703` to the URL. Assign it to A with the existing ramp buttons and close the dialog: its card moves from C to A. Switch to Loadings and the same row shows ramp A. Reload to restore the original fixture assignments; this checkpoint edits in-memory models and does not persist assignments to a server.

### 9. Derive ramp status and apply the original colours

A ramp's status describes **all its assigned loadings**, independently of which view is open. Replace `src/store/Ramp.ts` with this complete version, retaining the relationship getter:

```ts title="src/store/Ramp.ts — status"
import { makeAutoObservable } from "mobx";
import { Loading } from "./Loading";
import { store } from "./Store";

export type Status = "empty" | "loaded" | "progress" | "not-started" | "";

export class Ramp {
  constructor(
    public id: string,
    public description: string,
  ) {
    makeAutoObservable(this);
  }

  get loadings(): Loading[] {
    return store.loadings.filter(loading => loading.ramp === this);
  }

  get isEmpty(): boolean {
    return this.loadings.length === 0;
  }

  get isLoaded(): boolean {
    return this.loadings.every(loading => loading.isLoaded);
  }

  get isInProgress(): boolean {
    return this.loadings.some(loading => loading.isInProgress);
  }

  get isSomeNotStarted(): boolean {
    return this.loadings.some(loading => !loading.isStarted);
  }

  get status(): Status {
    if (this.isEmpty) return "empty";
    if (this.isLoaded) return "loaded";
    if (this.isSomeNotStarted) return "not-started";
    if (this.isInProgress) return "progress";
    return "";
  }
}
```

In `src/components/RampBox.tsx`, change its opening `<main>` tag to:

```tsx title="src/components/RampBox.tsx — status class"
<main className={ramp.status}>
```

Keep the class on the ramp's **body**, where the existing `Ramp.scss` selectors expect it. Its `loaded`, `progress` and `not-started` rules provide green, amber and red backgrounds. There is no filled `.empty` rule: empty ramps keep their striped background. Do not rewrite the stylesheet.

The order is deliberate. An empty array satisfies `every`, so `isLoaded` alone is true for an empty ramp; the `isEmpty` branch must run first. Any not-started assignment takes precedence over a partially picked assignment. Also inspect the original `Loading` getters: `isInProgress` means `picked !== pallets`, so a positive-total loading with zero picked pallets satisfies it too. The earlier `isSomeNotStarted` branch resolves that overlap. We preserve those model semantics rather than substituting the mini fixture's status strings.

After a fresh reload, expect:

| Ramp | Assigned progress | Status and appearance |
| --- | --- | --- |
| A, F, G | No loadings | `empty`, striped. |
| B | `2/2` | `loaded`, green. |
| C | `1/1` and `11/22` | `progress`, amber. |
| D | `14/36`, `3/6`, `5/7` | `progress`, amber. |
| E | `0/42` and `3/29` | `not-started`, red. |

**Check:** E must be red even though `0007708` has started. This original rule is **Not started before In progress**; the four mini-lessons intentionally use a different **Loading before Waiting** rule. Do not copy that priority here. Open `0007707`, move it to A and close: A becomes red and E becomes amber. Move it back to restore the initial distribution, or reload.

### 10. Show occupancy and intent in the existing assignment dialog

Add this getter **inside** `Ramp` in `src/store/Ramp.ts`, alongside the other getters from step 9:

```ts title="src/store/Ramp.ts — quantity"
get quantity(): number {
  return this.loadings.length;
}
```

This is a count of loadings, not pallets. It changes automatically when `setRamp` or `clearRamp` changes the relationship.

In `src/components/Details.tsx`, find the existing `<section className="ramps">` and replace **that entire section only** with the following. Keep the rest of the file, including its existing `Intent` import, local dialog animation state, dates, duration slider, other fields and close handlers:

```tsx title="src/components/Details.tsx — ramp choices"
<section className="ramps">
  <FormGroup label="Ramp:" className="ramps-list">
    {ramps.map(r => <Button key={r.id} className="ramp-button" outlined
      active={r === loading.ramp}
      onClick={() => loading.setRamp(r)}
      intent={r.isEmpty ? Intent.NONE
        : r === loading.ramp ? Intent.PRIMARY : Intent.DANGER}>
      {r.description}
      <sup>{r.quantity > 0 ? r.quantity : null}</sup>
    </Button>)}
    <Button onClick={loading.clearRamp} active={!loading.ramp}
      outlined className="ramp-button">∅</Button>
  </FormGroup>
</section>
```

The empty/current/occupied order means an empty ramp is neutral; a nonempty current ramp is primary; another occupied ramp is danger. `active` still identifies the current assignment. The superscript renders only positive counts; the explicit ternary prevents a stray `0` from appearing. `Intent` and `active` are Blueprint button props, not status fields on the `Loading` model. These colours describe occupancy when choosing a ramp, whereas the dashboard body colour describes loading progress.

**Check:** after reload, open `0007703`. C is active/primary with count 2; B, D and E are danger with counts 1, 3 and 2; A, F and G are neutral without counts. Click A: its count becomes 1 and it becomes active/primary, while C's count becomes 1 and it becomes danger. Click ∅: A becomes neutral again, the loading disappears from the ramp board and it remains in the table with no ramp. Other occupied ramps are still selectable; danger intent is information, not a capacity constraint.

### 11. Verify the complete continuation

Run the build again:

```shell
pnpm dlx pnpm@8.15.9 run build
```

Then walk through these checks in the running local app:

1. Reload with no query. Dashboard is active; seven ramps show eight assigned cards with the original styling and the status table above.
2. Select Loadings. All eleven rows appear, including the three unassigned loadings; selecting Dashboard returns to the same models.
3. Open `0007703` from either view. Check its date/time, customer Kang Tao, `11 of 22` and half-filled progress. In the dialog, move it between ramps, observe counts and assignments, then clear its ramp with ∅.
4. Reload `/?view=loadings&loading=0007703&keep=yes#dock`. The table and correct dialog open together. Closing the dialog and changing views retain `keep=yes` and the hash. Reload `/?view=unknown&loading=missing`: the default dashboard opens with no dialog.
5. Reload the fixture before testing mixed states. B is loaded, E is not-started, C/D are in progress, and A/F/G are empty. A ramp containing a waiting and a started loading remains not-started.
6. Open **Add loading**. The existing new-loading dialog still opens. It is not a new persistence workflow: this lesson does not add saving, a backend or a dashboard bucket for unassigned loadings.

You have changed `UI.ts`, `Ramp.ts`, `Header.tsx`, `Content.tsx` and the ramp-choice section in `Details.tsx`, and created `RampBox.tsx` and `LoadingBox.tsx`. `Loading.ts`, the API mapping, fixture data, `App.tsx` and all Sass files stay as supplied. The dashboard, table and dialog now share the same observable models, so changing an assignment updates each presentation without copying or manually synchronizing their data.
