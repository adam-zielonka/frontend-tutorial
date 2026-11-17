import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: "Frontend tutorial",
  url: "https://adam-zielonka.github.io/",
  baseUrl: "/frontend-tutorial",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo.png",

  organizationName: "adam-zielonka",
  projectName: "frontend-tutorial",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: "./docs",
          sidebarPath: require.resolve("./sidebars.ts"),
          numberPrefixParser: false,
          routeBasePath: "/",
          editUrl:
            "https://github.com/adam-zielonka/frontend-tutorial/blob/main/",
        },
        pages: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    ["@easyops-cn/docusaurus-search-local", {
      indexBlog: false,
      docsRouteBasePath: "/",
    }]
  ],

  themeConfig: {
    navbar: {
      title: "Frontend tutorial",
      logo: {
        alt: "Frontend tutorial logo",
        src: "img/logo.png",
      },
      items: [
        {
          href: "https://github.com/adam-zielonka/frontend-tutorial",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    // announcementBar: {
    //   id: "workinprogress",
    //   content: "This tutorial is work in progress. Please be patient. Some mistakes may occur." +
    //     " Final result can be different than presented here.",
    //   backgroundColor: "#4a1790",
    //   textColor: "#d5b1ff",
    //   isCloseable: false,
    // },
    prism: {
      theme: {...prismThemes.github, styles: [...prismThemes.github.styles,
        {types: ['comment', 'prolog', 'doctype', 'cdata'], style: {color: '#596575'}},
        {types: ['boolean', 'number', 'constant', 'property', 'symbol', 'variable', 'regex', 'inserted'], style: {color: '#086b68'}},
        {types: ['atrule', 'attr-name'], style: {color: '#005f87'}},
        {types: ['function', 'deleted', 'tag'], style: {color: '#b42346'}},
        {types: ['string', 'attr-value'], style: {color: '#b31159'}},
        {types: ['namespace'], style: {opacity: 1}},
      ]},
      darkTheme: {...prismThemes.dracula, styles: [...prismThemes.dracula.styles,
        {types: ['comment'], style: {color: '#a7b4d2'}},
      ]},
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
