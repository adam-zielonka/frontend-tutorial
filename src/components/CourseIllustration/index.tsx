import React, {useEffect, useId, useRef, useState, type ReactNode} from 'react';
import styles from './styles.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

export type CourseIllustrationTopic = 'intro' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08';

type Props = {topic: CourseIllustrationTopic; illustration: undefined | {src: string; title: string; alt: string; description: string}};
type DrawingProps = {id: string};

const chapters: Record<CourseIllustrationTopic, {
  label: string;
  title: string;
  description: string;
  caption: string;
}> = {
  intro: {
    label: 'Your learning route',
    title: 'The eight chapters of the course',
    description: 'Eight connected stops: tools, development workflow, React, MobX, ShippingBoard, tests, Fetch and UI5. The course uses related teaching projects, including pallet counters and a shipping interface.',
    caption: 'Follow the ideas across several teaching projects. Embedded exercises have prepared checkpoints. The later ShippingBoard lessons share a checkout.',
  },
  '01': {
    label: '01 / Understand the tool set',
    title: 'From shipment records to a pallet total',
    description: 'TypeScript describes a shipment with a pallet count and priority. React renders a shipment summary. Node.js runs pnpm and Vite; Vite transforms and serves browser assets. MobX manages application state.',
    caption: 'Node runs the tools. TypeScript checks the code. React renders the UI. MobX manages state.',
  },
  '02': {
    label: '02 / Your development workflow',
    title: 'From an editor change to a Git commit',
    description: 'An editor shows a typed pallet value. A terminal runs pnpm build and git diff. Browser developer tools inspect the interface. A Git timeline records a local checkpoint, with a separate branch for an experiment.',
    caption: 'Use editor feedback, run project scripts, inspect the browser, then record a local Git commit.',
  },
  '03': {
    label: '03 / React basics',
    title: 'How one click updates the pallet count',
    description: 'A plus-one click calls an event handler, which updates remembered state from four to five. React renders a pallet counter displaying five. The next click repeats the loop, and subtraction is bounded at zero.',
    caption: 'The handler updates state; React renders the next count. Keep every subtraction at or above zero.',
  },
  '04': {
    label: '04 / MobX in React',
    title: 'How counter values become a total',
    description: 'An add action changes one counter. After the change the collection holds counters with values two, three and five. A computed getter derives the total of ten. A React observer reads the values during render and subscribes to their changes.',
    caption: 'makeAutoObservable prepares the model. observer subscribes the React component that reads it.',
  },
  '05': {
    label: '05 / ShippingBoard Lite',
    title: 'Three ramps on the loading dashboard',
    description: 'A ShippingBoard-inspired dashboard has a striped available ramp A, a green completed ramp B with Militech loading 0007701 at two of two pallets, and an amber ramp C with loadings at one of one and eleven of twenty-two. Dashboard and loading-table views share the same records.',
    caption: 'Derive visible loadings and ramp groups from the records. An empty ramp and an empty filter tell different stories.',
  },
  '06': {
    label: '06 / Test the behavior',
    title: 'Why the counter stops at ten',
    description: 'Arrange a counter at eight, act by changing it by five, and assert that the value is ten. A boundary rail shows the attempted value of thirteen being clamped to the upper limit of ten; the lower limit is zero.',
    caption: 'Edit a test, run it with Vitest, and compare the actual result with your expectation.',
  },
  '07': {
    label: '07 / Load data with Fetch',
    title: 'From a ramps request to the ready view',
    description: 'A request for ramps.json passes through response.ok and runtime data-shape checks before reaching the ready interface. Errors can be retried. An obsolete effect request is aborted; only the current request is allowed to commit its result.',
    caption: 'Check HTTP status and data shape. Cancel obsolete work, guard stale results, and retry deliberately.',
  },
  '08': {
    label: '08 / UI5 components',
    title: 'How the pallet count drives UI5 controls',
    description: 'A UI5 Button, a registered add icon and a ProgressIndicator are assembled into a pallet-loading interface inside one ThemeProvider. Six of ten pallets gives sixty percent progress, and state remains bounded between zero and ten.',
    caption: 'Wrap the app once, register the icons, connect events, and derive progress from the pallet count.',
  },
};

function Arrow({id, d, secondary = false, dashed = false}: DrawingProps & {
  d: string;
  secondary?: boolean;
  dashed?: boolean;
}) {
  return <path d={d} className={`${styles.arrow} ${secondary ? styles.amberLine : ''}`}
    strokeDasharray={dashed ? '6 8' : undefined}
    markerEnd={`url(#${id}-${secondary ? 'amber' : 'arrow'})`} />;
}

function Window({x, y, width, height, label, children}: {
  x: number; y: number; width: number; height: number; label: string; children?: ReactNode;
}) {
  return <g transform={`translate(${x} ${y})`}>
    <rect className={styles.shadow} x="5" y="7" width={width} height={height} rx="14" />
    <rect className={styles.paper} width={width} height={height} rx="14" />
    <path className={styles.rule} d={`M0 38 H${width}`} />
    <circle className={styles.dot} cx="16" cy="19" r="3" />
    <circle className={styles.dot} cx="28" cy="19" r="3" />
    <text className={styles.windowLabel} x="44" y="25">{label}</text>
    {children}
  </g>;
}

function Pallet({x, y, scale = 1}: {x: number; y: number; scale?: number}) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} className={styles.package}>
    <path d="M0 12 24 0 48 12 24 25Z" />
    <path d="M0 12V39L24 52V25M48 12V39L24 52M12 6 36 19V31" />
    <path d="M-4 45 24 60 52 45M-4 51 24 66 52 51" />
  </g>;
}

function Check({x, y, size = 13}: {x: number; y: number; size?: number}) {
  return <path className={styles.check} d={`M${x - size / 2} ${y} l${size / 3} ${size / 3} ${size * .7} ${-size * .75}`} />;
}

function RouteIcon({index}: {index: number}) {
  switch (index) {
    case 0: return <g className={styles.icon}>
      <path d="M-24-10H24V20H-24ZM-9-10V-20H9V-10M-24 0H24M-4-4V6H4V-4" />
    </g>;
    case 1: return <g className={styles.icon}>
      <rect x="-25" y="-20" width="50" height="40" rx="4" /><path d="m-15-7 8 7-8 7M0 9H15" />
    </g>;
    case 2: return <g className={styles.icon}>
      {[0, 60, 120].map(rotation => <ellipse key={rotation} rx="28" ry="10" transform={`rotate(${rotation})`} />)}
      <circle r="3" />
    </g>;
    case 3: return <g className={styles.icon}>
      <path d="M-24-22H-14V22H-24M24-22H14V22H24M-5-11 5 11M-11 3H11" />
    </g>;
    case 4: return <g className={styles.icon}>
      <rect x="-26" y="-22" width="52" height="44" rx="3" /><path d="M-26-10H26M-9-10V22M9-10V22M-20 0H-15M-2 0H3M16 0H21M-2 8H3" />
    </g>;
    case 5: return <g className={styles.icon}>
      <circle r="24" /><path d="m-12 0 8 9 18-20" />
    </g>;
    case 6: return <g className={styles.icon}>
      <path d="M-24-11H20L11-20M24 11H-20L-11 20M20-11 11-2M-20 11-11 2" />
    </g>;
    default: return <g className={styles.icon}>
      <rect x="-25" y="-22" width="21" height="21" rx="3" /><rect x="4" y="-22" width="21" height="21" rx="3" />
      <rect x="-25" y="7" width="50" height="15" rx="3" />
    </g>;
  }
}

function Intro() {
  const stops = [
    {x: 65, y: 100, label: 'Tools'}, {x: 222, y: 100, label: 'Workflow'},
    {x: 378, y: 100, label: 'React'}, {x: 535, y: 100, label: 'MobX'},
    {x: 535, y: 310, label: 'ShippingBoard'}, {x: 378, y: 310, label: 'Tests'},
    {x: 222, y: 310, label: 'Fetch'}, {x: 65, y: 310, label: 'UI5'},
  ];
  return <>
    <path className={styles.routeHalo} d="M65 100H535Q585 100 585 160V230Q585 310 535 310H65" />
    <path className={styles.route} d="M65 100H535Q585 100 585 160V230Q585 310 535 310H65" />
    {stops.map((stop, index) => <g key={stop.label} transform={`translate(${stop.x} ${stop.y})`}>
      <circle className={index === 4 || index === 7 ? styles.goldDisc : styles.disc} r="43" />
      <RouteIcon index={index} />
      <text className={styles.stepNumber} textAnchor="middle" y="-63">0{index + 1}</text>
      <text className={styles.nodeLabel} textAnchor="middle" y="74">
        {stop.label === 'ShippingBoard' ? <><tspan>Shipping</tspan><tspan x="0" dy="24">Board</tspan></> : stop.label}
      </text>
    </g>)}
  </>;
}

function ToolSet({id}: DrawingProps) {
  return <>
    <Window x={22} y={34} width={260} height={186} label="TypeScript / model">
      <text className={styles.code} x="20" y="66">type Shipment = {'{'}</text>
      <text className={styles.code} x="36" y="94">pallets: number;</text>
      <text className={styles.code} x="36" y="122">priority:</text>
      <text className={styles.code} x="36" y="150">'standard' | 'express';</text>
      <text className={styles.code} x="20" y="178">{'}'}</text>
    </Window>
    <Arrow id={id} d="M294 125H329" />
    <Window x={342} y={34} width={236} height={186} label="React / browser">
      <Pallet x={25} y={65} scale={.85} />
      <text className={styles.metric} x="92" y="112">16</text>
      <text className={styles.smallLabel} x="92" y="139">pallets</text>
      <path className={styles.rule} d="M18 159H218" />
      <text className={styles.smallLabel} x="22" y="180">3 shipments · 2 ready</text>
    </Window>
    <rect className={styles.wash} x="24" y="285" width="376" height="123" rx="24" />
    <text className={styles.nodeLabel} x="46" y="315">Node.js runs the tools</text>
    <rect className={styles.paper} x="46" y="333" width="118" height="50" rx="10" />
    <text className={styles.code} x="105" y="365" textAnchor="middle">pnpm</text>
    <Arrow id={id} d="M178 358H221" />
    <rect className={styles.goldPaper} x="237" y="333" width="135" height="50" rx="10" />
    <text className={styles.code} x="304" y="365" textAnchor="middle">Vite</text>
    <Arrow id={id} d="M376 350H468Q490 350 490 326V236" secondary />
    <text className={styles.smallLabel} x="512" y="285" textAnchor="middle">serve</text>
    <text className={styles.smallLabel} x="512" y="310" textAnchor="middle">&amp; build</text>
    <path className={styles.dashedLine} d="M62 237V260H344" />
    <text className={styles.smallLabel} x="80" y="254">checked before runtime</text>
    <text className={styles.handNote} x="448" y="411">MobX → state</text>
  </>;
}

function Workflow({id}: DrawingProps) {
  return <>
    <Window x={26} y={24} width={360} height={242} label="Editor / src/App.tsx">
      <text className={styles.lineNumber} x="16" y="82">1</text>
      <text className={styles.code} x="43" y="82">const pallets: number = 4;</text>
      <text className={styles.lineNumber} x="16" y="118">2</text>
      <text className={styles.code} x="43" y="118">return &lt;output&gt;</text>
      <text className={styles.codeAccent} x="66" y="154">{'{pallets}'} pallets</text>
      <text className={styles.code} x="43" y="190">&lt;/output&gt;;</text>
    </Window>
    <Window x={416} y={67} width={160} height={183} label="DevTools">
      <text className={styles.metric} x="26" y="101">4</text>
      <text className={styles.smallLabel} x="73" y="100">pallets</text>
      <path className={styles.rule} d="M15 119H145" />
      <text className={styles.code} x="17" y="151">&lt;output&gt;</text>
      <path className={styles.amberLine} d="M17 160H122" />
    </Window>
    <Window x={78} y={221} width={440} height={128} label="Terminal / project folder">
      <text className={styles.code} x="22" y="70">$ pnpm build</text>
      <Check x={242} y={65} /><text className={styles.smallLabel} x="261" y="71">type check + build</text>
      <text className={styles.code} x="22" y="106">$ git diff</text>
      <text className={styles.smallLabel} x="232" y="106">review your changes</text>
    </Window>
    <path className={styles.inkLine} d="M60 402H540M251 402Q282 402 304 377H407" />
    {[85, 251, 486].map(x => <circle key={x} className={styles.disc} cx={x} cy="402" r="9" />)}
    <circle className={styles.goldDisc} cx="407" cy="377" r="9" />
    <text className={styles.smallLabel} x="60" y="434">start</text>
    <text className={styles.smallLabel} x="204" y="434">local commit</text>
    <text className={styles.smallLabel} x="417" y="368">experiment</text>
    <Arrow id={id} d="M390 131H408" dashed />
  </>;
}

function ReactLoop({id}: DrawingProps) {
  return <>
    <Arrow id={id} d="M196 109H397" />
    <Arrow id={id} d="M497 176C497 254 452 301 409 311" />
    <Arrow id={id} d="M191 317C105 307 99 231 99 176" secondary />
    <text className={styles.smallLabel} x="300" y="93" textAnchor="middle">current + 1</text>
    <text className={styles.smallLabel} x="507" y="240">render</text>
    <text className={styles.smallLabel} x="25" y="263">next click</text>
    <rect className={styles.paper} x="20" y="45" width="172" height="121" rx="22" />
    <text className={styles.nodeLabel} x="106" y="81" textAnchor="middle">01 / Event</text>
    <rect className={styles.goldPaper} x="54" y="100" width="104" height="45" rx="11" />
    <text className={styles.buttonText} x="106" y="130" textAnchor="middle">+ 1</text>
    <rect className={styles.paper} x="408" y="45" width="172" height="121" rx="22" />
    <text className={styles.nodeLabel} x="494" y="81" textAnchor="middle">02 / State</text>
    <text className={styles.oldValue} x="438" y="137">4</text>
    <text className={styles.nodeLabel} x="475" y="131">→</text>
    <text className={styles.metric} x="516" y="140">5</text>
    <g transform="translate(300 204)" className={styles.reactMark}>
      {[0, 60, 120].map(rotation => <ellipse key={rotation} rx="39" ry="14" transform={`rotate(${rotation})`} />)}
      <circle r="5" />
    </g>
    <Window x={203} y={276} width={194} height={137} label="03 / Component">
      <Pallet x={23} y={58} scale={.8} />
      <text className={styles.metric} x="93" y="93">5</text>
      <text className={styles.smallLabel} x="94" y="116">pallets</text>
    </Window>
    <text className={styles.handNote} x="480" y="399" textAnchor="middle">count ≥ 0</text>
  </>;
}

function Mobx({id}: DrawingProps) {
  return <>
    <path className={styles.dashedLine} d="M513 133V42H302V58" />
    <text className={styles.smallLabel} x="417" y="28" textAnchor="middle">reads during render</text>
    <Arrow id={id} d="M165 196H203" secondary />
    <Arrow id={id} d="M301 266V300" />
    <Arrow id={id} d="M403 351H476Q513 351 513 307V281" />
    <rect className={styles.goldPaper} x="18" y="141" width="147" height="111" rx="20" />
    <text className={styles.nodeLabel} x="92" y="176" textAnchor="middle">Action</text>
    <text className={styles.code} x="92" y="217" textAnchor="middle">add(1)</text>
    <rect className={styles.wash} x="216" y="68" width="174" height="195" rx="23" />
    <text className={styles.nodeLabel} x="303" y="105" textAnchor="middle">Observable</text>
    <text className={styles.smallLabel} x="303" y="133" textAnchor="middle">counter models</text>
    {[2, 3, 5].map((value, index) => <g key={value}>
      <rect className={styles.paper} x={232 + index * 47} y="159" width="41" height="53" rx="9" />
      <text className={styles.counterValue} x={252 + index * 47} y="195" textAnchor="middle">{value}</text>
    </g>)}
    <text className={styles.smallLabel} x="303" y="243" textAnchor="middle">stable model IDs</text>
    <rect className={styles.paper} x="213" y="312" width="183" height="92" rx="18" />
    <text className={styles.nodeLabel} x="304" y="344" textAnchor="middle">Computed</text>
    <text className={styles.code} x="304" y="380" textAnchor="middle">sum = 10</text>
    <Window x={440} y={144} width={142} height={132} label="observer">
      <text className={styles.metric} x="71" y="94" textAnchor="middle">10</text>
      <text className={styles.smallLabel} x="71" y="119" textAnchor="middle">React total</text>
    </Window>
    <text className={styles.handNote} x="99" y="334" textAnchor="middle">derive it,</text>
    <text className={styles.handNote} x="99" y="362" textAnchor="middle">don't duplicate it</text>
  </>;
}

function ShippingBoard({id}: DrawingProps) {
  return <>
    <defs>
      <pattern id={`${id}-stripes`} width="13" height="13" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
        <rect className={styles.stripeBase} width="13" height="13" />
        <rect className={styles.stripeInk} width="5" height="13" />
      </pattern>
    </defs>
    <Window x={15} y={26} width={570} height={344} label="ShippingBoard Lite">
      <rect className={styles.selectedTab} x="272" y="7" width="133" height="25" rx="5" />
      <text className={styles.smallLabel} x="338" y="26" textAnchor="middle">Dashboard</text>
      <text className={styles.smallLabel} x="480" y="26" textAnchor="middle">Loadings</text>
      {[{name: 'A', x: 16}, {name: 'B', x: 203}, {name: 'C', x: 390}].map(ramp => <g key={ramp.name} transform={`translate(${ramp.x} 54)`}>
        <rect className={styles.paper} width="164" height="270" rx="8" />
        <text className={styles.rampLetter} x="82" y="29" textAnchor="middle">{ramp.name}</text>
        <rect x="5" y="43" width="154" height="220" fill={`url(#${id}-stripes)`} rx="4" />
        {ramp.name === 'A' ? <>
          <text className={styles.nodeLabel} x="82" y="143" textAnchor="middle">Available</text>
          <path className={styles.inkLine} d="M60 166H104M82 155V177" />
        </> : ramp.name === 'B' ? <>
          <rect className={styles.loadedWash} x="5" y="43" width="154" height="220" rx="4" />
          <rect className={styles.paper} x="13" y="54" width="138" height="179" rx="5" />
          <text className={styles.shipmentId} x="23" y="79">0007701</text>
          <path className={styles.rule} d="M23 91H141" />
          <text className={styles.smallLabel} x="23" y="116">06:00–09:00</text>
          <text className={styles.nodeLabel} x="23" y="147">Militech</text>
          <text className={styles.smallLabel} x="23" y="172">2/2 pallets</text>
          <rect className={styles.track} x="23" y="192" width="118" height="12" rx="5" />
          <rect className={styles.loadedFill} x="23" y="192" width="118" height="12" rx="5" />
          <text className={styles.statusLabel} x="82" y="252" textAnchor="middle">Loaded</text>
        </> : <>
          <rect className={styles.progressWash} x="5" y="43" width="154" height="220" rx="4" />
          {[{y: 54, code: '0007702', picked: '1/1', progress: 118}, {y: 145, code: '0007703', picked: '11/22', progress: 59}].map(loading => <g key={loading.code} transform={`translate(13 ${loading.y})`}>
            <rect className={styles.paper} width="138" height="82" rx="5" />
            <text className={styles.shipmentId} x="10" y="24">{loading.code}</text>
            <text className={styles.smallLabel} x="10" y="48">{loading.picked} pallets</text>
            <rect className={styles.track} x="10" y="61" width="118" height="9" rx="4" />
            <rect className={loading.progress === 118 ? styles.loadedFill : styles.progressFill} x="10" y="61" width={loading.progress} height="9" rx="4" />
          </g>)}
          <text className={styles.statusLabel} x="82" y="252" textAnchor="middle">In progress</text>
        </>}
      </g>)}
    </Window>
    <path className={styles.inkLine} d="M46 388V399H553V388" />
    <text className={styles.handNote} x="300" y="431" textAnchor="middle">One set of loadings · two views</text>
  </>;
}

function Tests({id}: DrawingProps) {
  const phases = [
    {x: 18, name: 'Arrange', value: 'value = 8', number: '01'},
    {x: 220, name: 'Act', value: 'change(5)', number: '02'},
    {x: 422, name: 'Assert', value: 'toBe(10)', number: '03'},
  ];
  return <>
    <Arrow id={id} d="M183 128H208" />
    <Arrow id={id} d="M385 128H410" />
    {phases.map(phase => <g key={phase.name} transform={`translate(${phase.x} 40)`}>
      <rect className={phase.name === 'Assert' ? styles.goldPaper : styles.paper} width="160" height="159" rx="20" />
      <text className={styles.stepNumber} x="20" y="33">{phase.number}</text>
      <text className={styles.nodeLabel} x="20" y="73">{phase.name}</text>
      <text className={styles.code} x="20" y="122">{phase.value}</text>
    </g>)}
    <text className={styles.smallLabel} x="300" y="252" textAnchor="middle">8 + 5 = 13 · upper limit 10</text>
    <rect className={styles.wash} x="59" y="290" width="421" height="26" rx="13" />
    <path className={styles.inkLine} d="M60 303H480" />
    {Array.from({length: 11}, (_, index) => <path key={index} className={styles.tick} d={`M${60 + index * 42} 295V311`} />)}
    <circle className={styles.disc} cx="396" cy="303" r="11" />
    <circle className={styles.goldDisc} cx="480" cy="303" r="15" />
    <path className={styles.dashedLine} d="M498 303H571" />
    <path className={styles.cross} d="m558 293 20 20m0-20-20 20" />
    <Arrow id={id} d="M399 279Q438 227 477 275" secondary />
    <text className={styles.counterValue} x="60" y="349" textAnchor="middle">0</text>
    <text className={styles.counterValue} x="396" y="349" textAnchor="middle">8</text>
    <text className={styles.counterValue} x="480" y="349" textAnchor="middle">10</text>
    <text className={styles.oldValue} x="568" y="351" textAnchor="middle">13</text>
    <Check x={480} y={378} size={19} />
    <text className={styles.handNote} x="300" y="431" textAnchor="middle">Boundaries · reset · independent instances</text>
  </>;
}

function Fetch({id}: DrawingProps) {
  return <>
    <Arrow id={id} d="M185 122H218" />
    <Arrow id={id} d="M376 122H410" />
    <Window x={17} y={39} width={167} height={154} label="Request">
      <text className={styles.code} x="17" y="79">ramps.json</text>
      <circle className={styles.loadingRing} cx="36" cy="114" r="13" />
      <text className={styles.smallLabel} x="60" y="120">loading</text>
    </Window>
    <path className={styles.goldPaper} d="M300 39 377 121 300 203 223 121Z" />
    <text className={styles.nodeLabel} x="300" y="97" textAnchor="middle">Validate</text>
    <text className={styles.codeSmall} x="300" y="129" textAnchor="middle">response.ok</text>
    <text className={styles.codeSmall} x="300" y="155" textAnchor="middle">data shape</text>
    <Window x={422} y={39} width={160} height={154} label="Ready state">
      <text className={styles.smallLabel} x="18" y="79">Ramp A</text><Check x={126} y={73} />
      <path className={styles.rule} d="M18 92H141" />
      <text className={styles.smallLabel} x="18" y="122">Ramp B</text><Check x={126} y={116} />
    </Window>
    <Arrow id={id} d="M300 208V227" secondary />
    <rect className={styles.paper} x="237" y="237" width="126" height="40" rx="20" />
    <text className={styles.smallLabel} x="300" y="264" textAnchor="middle">error</text>
    <Arrow id={id} d="M227 257H101V208" dashed secondary />
    <text className={styles.smallLabel} x="160" y="244" textAnchor="middle">retry</text>
    <text className={styles.codeSmall} x="21" y="331">effect 1</text>
    <path className={styles.dashedLine} d="M132 325H353" />
    <path className={styles.cross} d="m350 314 21 21m0-21-21 21" />
    <text className={styles.smallLabel} x="389" y="331">obsolete · abort</text>
    <text className={styles.codeSmall} x="21" y="395">effect 2</text>
    <Arrow id={id} d="M132 389H352" />
    <Check x={369} y={388} size={20} />
    <text className={styles.smallLabel} x="389" y="395">current · commit</text>
    <path className={styles.rule} d="M19 298H580" />
  </>;
}

function Ui5({id}: DrawingProps) {
  return <>
    <rect className={styles.provider} x="204" y="21" width="377" height="395" rx="27" />
    <text className={styles.code} x="231" y="59">ThemeProvider</text>
    <text className={styles.smallLabel} x="231" y="85">one shared theme</text>
    <Arrow id={id} d="M179 107H273V190" dashed />
    <Arrow id={id} d="M157 218H249" dashed secondary />
    <Arrow id={id} d="M182 335H249" dashed />
    <g transform="translate(20 56)">
      <rect className={styles.paper} width="158" height="97" rx="16" />
      <text className={styles.code} x="17" y="32">Button</text>
      <rect className={styles.solidAccent} x="17" y="49" width="124" height="31" rx="6" />
      <path className={styles.onAccentLine} d="M34 58V71M28 65H40M52 65H122" />
    </g>
    <g transform="translate(32 183)">
      <circle className={styles.goldDisc} cx="36" cy="35" r="33" />
      <path className={styles.inkLine} d="M36 20V50M21 35H51" />
      <text className={styles.smallLabel} x="48" y="93" textAnchor="middle">registered icon</text>
    </g>
    <g transform="translate(12 310)">
      <rect className={styles.paper} width="170" height="88" rx="16" />
      <text className={styles.codeSmall} x="12" y="31">ProgressIndicator</text>
      <rect className={styles.track} x="14" y="51" width="142" height="14" rx="7" />
      <rect className={styles.progressFill} x="14" y="51" width="85" height="14" rx="7" />
    </g>
    <Window x={260} y={119} width={291} height={253} label="Your loading interface">
      <Pallet x={24} y={58} scale={.85} />
      <text className={styles.counterValue} x="92" y="86">6 / 10</text>
      <text className={styles.smallLabel} x="93" y="113">pallets loaded</text>
      <rect className={styles.solidAccent} x="23" y="140" width="245" height="43" rx="9" />
      <path className={styles.onAccentLine} d="M44 153V171M35 162H53" />
      <text className={styles.onAccentText} x="72" y="169">Load a pallet</text>
      <rect className={styles.track} x="23" y="204" width="245" height="17" rx="8" />
      <rect className={styles.progressFill} x="23" y="204" width="147" height="17" rx="8" />
      <text className={styles.smallLabel} x="268" y="243" textAnchor="end">60% of capacity</text>
    </Window>
    <text className={styles.handNote} x="397" y="403" textAnchor="middle">0 ≤ pallets ≤ 10</text>
  </>;
}

const drawings: Record<CourseIllustrationTopic, React.ComponentType<DrawingProps>> = {
  intro: Intro, '01': ToolSet, '02': Workflow, '03': ReactLoop, '04': Mobx,
  '05': ShippingBoard, '06': Tests, '07': Fetch, '08': Ui5,
};

/** A chapter's visual companion; the outer region scrolls inside a flex pane. */
export default function CourseIllustration({topic, illustration}: Props) {
  const [enlarged, setEnlarged] = useState(false);
  const pane = useRef<HTMLElement>(null);
  const id = `course-illustration-${useId().replace(/:/g, '')}`;
  const chapter = chapters[topic];
  const Drawing = drawings[topic];
  const illustrationUrl = useBaseUrl(illustration?.src ?? '/');

  useEffect(() => {
    if (!pane.current || typeof ResizeObserver === 'undefined') return;
    // Resizing the reading pane also changes the space available to a diagram.
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 640) setEnlarged(false);
    });
    observer.observe(pane.current);
    return () => observer.disconnect();
  }, []);

  const heading = illustration?.title ?? chapter.title;
  return <section ref={pane} className={styles.illustration} data-course-illustration={topic}
    aria-label={`${heading} illustration`} tabIndex={0}>
    <figure className={styles.sheet}>
      <header className={styles.heading}>
        {(topic !== 'intro' || !illustration) && <p className={styles.eyebrow}>{chapter.label}</p>}
        <h2>{heading}</h2>
      </header>
      <div className={styles.diagramTools}>
        <button type="button" aria-pressed={enlarged} aria-controls={`${id}-drawing`}
          onClick={() => setEnlarged(value => !value)}>{enlarged ? 'Fit diagram' : 'Enlarge diagram'}</button>
        {enlarged && <span>Scroll the diagram to see every detail.</span>}
      </div>
      <div id={`${id}-drawing`} className={`${styles.stage} ${enlarged ? styles.enlarged : ''}`}
        tabIndex={enlarged ? 0 : undefined} role={enlarged ? 'region' : undefined}
        aria-label={enlarged ? 'Enlarged diagram; scroll to explore' : undefined}>
        {illustration ? <img className={styles.drawing} src={illustrationUrl} alt={illustration.alt} /> : <svg className={styles.drawing} viewBox="0 0 600 450" role="img"
          aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`} focusable="false">
          <title id={`${id}-title`}>{chapter.title}</title>
          <desc id={`${id}-description`}>{chapter.description}</desc>
          <defs>
            <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path className={styles.arrowHead} d="m1 1 7 4-7 4" />
            </marker>
            <marker id={`${id}-amber`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path className={styles.amberHead} d="m1 1 7 4-7 4" />
            </marker>
          </defs>
          <Drawing id={id} />
        </svg>}
      </div>
      <figcaption className={styles.caption}>
        <span className={styles.captionLine} aria-hidden="true" />
        <p>{illustration?.description ?? chapter.caption}</p>
      </figcaption>
    </figure>
  </section>;
}
