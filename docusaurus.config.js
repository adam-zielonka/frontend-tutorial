// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
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
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "./docs",
          routeBasePath: "/",
          editUrl:
            "https://github.com/adam-zielonka/frontend-tutorial/blob/main/docs/",
        },
        pages: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
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
      announcementBar: {
        id: "workinprogress",
        content: "This tutorial is work in progress. Please be patient. Some mistakes may occur." +
          " Final result can be different than presented here.",
        backgroundColor: "#fafbfc",
        textColor: "#091E42",
        isCloseable: false,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
